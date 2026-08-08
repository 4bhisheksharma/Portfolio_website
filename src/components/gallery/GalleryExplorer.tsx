import { useMemo, useState } from "react";
import { galleryImages } from "@/data/gallery";
import { GalleryLightbox } from "@/components/common/GalleryLightbox";
import DriftWall, { type DriftWallItem } from "@/components/common/DriftWall";

interface GalleryDriftItem extends DriftWallItem {
  galleryIndex: number;
}

export function GalleryExplorer() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const driftItems = useMemo<GalleryDriftItem[]>(
    () =>
      galleryImages.map((image, index) => ({
        image: image.src,
        title: image.caption ?? image.alt,
        galleryIndex: index,
      })),
    []
  );

  const handleTileClick = (item: GalleryDriftItem) => {
    setLightboxIndex(item.galleryIndex);
  };

  return (
    <>
      <div className="relative">
        <div className="mb-8 md:mb-10">
          <p className="text-xs uppercase tracking-widest text-primary/70 mb-1.5">Visual Archive</p>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight">
            Gallery
            <span className="text-muted-foreground/50 ml-2 text-base md:text-lg font-normal">
              {galleryImages.length}
            </span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg">
            Projects, certifications, and moments from my portfolio. Click a tile to view full size.
          </p>
        </div>

        <div
          className="relative -mx-5 sm:mx-0 rounded-xl overflow-hidden border border-border/50"
          style={{ height: "min(72vh, 640px)" }}
        >
          <DriftWall<GalleryDriftItem>
            items={driftItems}
            onTileClick={handleTileClick}
            columns={5}
            tileWidth={164}
            tileHeight={220}
            gap={16}
            tilt={11}
            turn={-14}
            perspective={1200}
            depth={120}
            speed={22}
            direction="up"
            variance={0.45}
            parallax={0.9}
            pauseOnHover
            lift={64}
            fade={0.6}
            dim={0.55}
            overlayColor="#060010"
            grayscale
          />
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
