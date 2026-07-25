import Lottie from "lottie-react";
import botAnimation from "../../../public/assets/lottie/ai-bot.json";

interface LottieBotProps {
  size?: number;
  loop?: boolean;
}

export function LottieBot({ size = 56, loop = true }: LottieBotProps) {
  return (
    <div
      className="overflow-hidden shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Lottie
        animationData={botAnimation}
        loop={loop}
        style={{ width: size, height: size }}
        className="pointer-events-none"
      />
    </div>
  );
}
