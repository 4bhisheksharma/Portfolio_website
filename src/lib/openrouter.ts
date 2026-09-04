const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Actual free models on OpenRouter
const FREE_MODELS = [
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-3.5-lightning:free",
  "minimax/minimax-m3:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "inclusionai/ling-3.0-flash-fin:free",
  "thinkingmachines/inkling-small:free",
  "poolside/laguna-s-2.1:free",
];

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
      "The AI assistant is currently offline. Please configure an API key to enable chat."
    );
  }

  let lastStatus = 0;

  for (const model of FREE_MODELS) {
    if (signal?.aborted) return;

    try {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://abhishek-sharma.com.np/",
          "X-Title": "Abhishek Sharma Portfolio",
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 1024,
          include_reasoning: false,
        }),
        signal,
      });

      if (!response.ok) {
        lastStatus = response.status;
        // Try next model if current one is unavailable (404/429/500/etc.)
        continue;
      }

      if (!response.body) {
        continue;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let receivedAnyChunk = false;

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
              choices?: {
                delta?: {
                  content?: string;
                  reasoning?: string;
                  thought?: string;
                };
              }[];
            };
            // Strictly extract answer content; disregard reasoning or thoughts
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              receivedAnyChunk = true;
              onChunk(content);
            }
          } catch {
            // skip malformed SSE chunks
          }
        }
      }

      if (receivedAnyChunk) {
        return; // Stream succeeded
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") throw err;
      // Continue to next model on network/fetch errors
    }
  }

  // All free models attempted and none succeeded
  if (lastStatus === 429) {
    throw new Error("The AI service is experiencing high traffic. Please wait a moment and try again.");
  }

  throw new Error("The AI assistant is temporarily unavailable. Please try again in a few moments.");
}
