import { PhoneOSProvider } from "@/context/PhoneOSContext";
import { PhoneOS } from "@/components/os/PhoneOS";

interface GalleryPageProps {
  onOpenTerminal: () => void;
}

export function GalleryPage({ onOpenTerminal }: GalleryPageProps) {
  return (
    <PhoneOSProvider initialUnlocked initialApp="gallery" onOpenTerminal={onOpenTerminal}>
      <PhoneOS />
    </PhoneOSProvider>
  );
}
