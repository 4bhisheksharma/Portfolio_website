const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-oss-20b:free";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function streamChatCompletion(
  messages: ChatMessage[],
  onChunk: (text: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "AI assistant is unavailable — API key was not included in this build."
    );
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://abhishek-sharma.com.np/",
      "X-Title": "Abhishek Sharma Portfolio",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 1024,
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText ? `Request failed (${response.status}): ${errorText}` : `Request failed (${response.status})`
    );
  }

  if (!response.body) {
    throw new Error("No response body received.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;

      try {
        const parsed = JSON.parse(data) as {
          choices?: { delta?: { content?: string } }[];
        };
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onChunk(content);
      } catch {
        // skip malformed SSE chunks
      }
    }
  }
}
