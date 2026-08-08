import { useEffect, useState } from "react";

export function useCardSwapSize() {
  const [size, setSize] = useState({ width: 320, height: 400 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setSize({ width: Math.min(w - 40, 300), height: 380 });
      } else if (w < 640) {
        setSize({ width: 320, height: 400 });
      } else if (w < 1024) {
        setSize({ width: 360, height: 420 });
      } else {
        setSize({ width: 400, height: 440 });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export function useDepthCarouselLayout() {
  const { width, height } = useCardSwapSize();
  const [layout, setLayout] = useState({
    spread: 100,
    depth: 160,
    scrollStepVh: 50,
    visibleCards: 3,
    showControls: false,
    isMobile: false,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;
      if (isMobile) {
        setLayout({
          spread: 38,
          depth: 100,
          scrollStepVh: 50,
          visibleCards: 2,
          showControls: true,
          isMobile: true,
        });
      } else if (w < 1024) {
        setLayout({
          spread: 70,
          depth: 140,
          scrollStepVh: 40,
          visibleCards: 3,
          showControls: false,
          isMobile: false,
        });
      } else {
        setLayout({
          spread: 100,
          depth: 160,
          scrollStepVh: 38,
          visibleCards: 3,
          showControls: false,
          isMobile: false,
        });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { width, height, ...layout };
}
