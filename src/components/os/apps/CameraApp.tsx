import { useEffect, useRef, useState } from "react";
import { CameraOff, SwitchCamera } from "lucide-react";
import { AppScreenShell } from "../AppScreenShell";
import { screenMeta } from "@/data/osApps";

export function CameraApp() {
  const meta = screenMeta.camera;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");

  useEffect(() => {
    let cancelled = false;

    async function start() {
      setError(null);
      try {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        if (!cancelled) {
          setError("Camera access denied or unavailable in this browser.");
        }
      }
    }

    void start();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [facingMode]);

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="relative flex h-full flex-col bg-black">
        {error ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <CameraOff className="h-10 w-10 text-white/40" />
            <p className="text-xs text-white/60">{error}</p>
            <p className="text-[10px] text-white/35">
              Allow camera permission and try again.
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() =>
              setFacingMode((m) => (m === "user" ? "environment" : "user"))
            }
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md ring-1 ring-white/20"
            aria-label="Switch camera"
          >
            <SwitchCamera className="h-5 w-5" />
          </button>
        </div>
      </div>
    </AppScreenShell>
  );
}
