import { useState } from "react";
import { ExternalLink, FileText, Download, ChevronLeft, ShieldCheck } from "lucide-react";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { PhoneStatusBar } from "../PhoneStatusBar";
import { PhoneNavBar } from "../PhoneNavBar";
import { LINKS } from "@/data/osApps";

export function ResumeApp() {
  const { closeApp } = usePhoneOS();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="flex h-full flex-col bg-[#0c0c10] select-none text-white overflow-hidden">
      {/* Phone Status Bar */}
      <PhoneStatusBar />

      {/* Full-Phone Document Reader Header Bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#121217]/90 px-3 py-2 backdrop-blur-xl">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={closeApp}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 active:scale-90"
            aria-label="Close document"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm ring-1 ring-white/20">
            <FileText className="h-4 w-4" strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate text-xs font-semibold text-white">
                Abhishek-CV.pdf
              </span>
              <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
            </div>
            <p className="truncate text-[9.5px] text-white/50">PDF Document · Flutter Dev</p>
          </div>
        </div>

        {/* Quick Header Actions */}
        <div className="flex items-center gap-1">
          <a
            href={LINKS.resume}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-white/90 ring-1 ring-white/10 transition-colors hover:bg-white/[0.15] active:scale-95"
            title="Download PDF"
            aria-label="Download PDF"
          >
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Full-Height Embedded PDF Viewer Stage */}
      <div className="relative flex-1 w-full bg-[#18181d] overflow-hidden">
        <iframe
          title="Resume PDF Viewer"
          src={`${LINKS.resume}#toolbar=0&navpanes=0&scrollbar=1`}
          onLoad={() => setIframeLoaded(true)}
          className="h-full w-full border-0 bg-[#16161b]"
        />

        {/* Loading placeholder skeleton while iframe initialises */}
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#101014] text-white/50">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-amber-400" />
            <p className="text-[11px]">Loading Document...</p>
          </div>
        )}

        {/* Floating Quick Action Pill at Bottom */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-black/80 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-black transition-all hover:bg-white/90 active:scale-95 shadow-sm"
            >
              <ExternalLink className="h-3 w-3" />
              <span>View in another tab</span>
            </a>

            <a
              href={LINKS.resume}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-white/20 active:scale-95"
            >
              <Download className="h-3 w-3" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>

      {/* Phone Navigation Bar */}
      <PhoneNavBar showBack />
    </div>
  );
}
