import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { Reveal } from "@/components/common/Reveal";

export function GalleryPage() {
  return (
    <main className="min-h-screen">
      <div className="section-padding pt-24 md:pt-28">
        <div className="container-max">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </Reveal>

          <GalleryExplorer />
        </div>
      </div>
    </main>
  );
}
