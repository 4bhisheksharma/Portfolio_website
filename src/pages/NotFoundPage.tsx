import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="os-desktop-bg min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 text-white select-none">
      <div className="text-center flex flex-col items-center gap-5">
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-white/90 font-mono">
          404
        </h1>
        <p className="text-sm text-zinc-400 font-mono tracking-wide uppercase">
          Page Not Found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm transition-all active:scale-[0.97]"
        >
          <Home className="w-4 h-4 text-emerald-400" />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
