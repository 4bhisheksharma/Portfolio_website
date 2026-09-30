import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SplitReveal } from "@/components/motion/Text";
import { Magnetic } from "@/components/motion/Magnetic";

export function NotFoundPage() {
  return (
    <main className="container-max flex min-h-[100svh] flex-col items-start justify-center">
      <p className="mb-6 font-mono text-xs text-muted-foreground">Error 404</p>
      <h1 className="text-[clamp(3rem,10vw,8rem)] font-medium leading-[0.92] tracking-[-0.05em]">
        <SplitReveal text="Lost in" immediate />{" "}
        <span className="font-serif font-normal italic text-primary">
          <SplitReveal text="the void." immediate delay={0.15} />
        </span>
      </h1>
      <p className="mt-6 max-w-sm text-muted-foreground">This page doesn&apos;t exist, but plenty of good work does.</p>
      <Magnetic className="mt-10">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-x-1" />
          Back home
        </Link>
      </Magnetic>
    </main>
  );
}
