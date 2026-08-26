import { useEffect, useState } from "react";
import { useLoopingClip } from "@/lib/use-looping-clip";
import { cn } from "@/lib/utils";

type StrandSize = "nav" | "hero";

const SIZE: Record<StrandSize, string> = {
  nav: "strand-nav",
  hero: "strand-hero",
};

export function StrandMark({
  size,
  className,
  label,
}: {
  size: StrandSize;
  className?: string;
  label?: string;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const live = size === "hero" && !reduceMotion;
  const ref = useLoopingClip(live);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const frame = (
    <img
      src="/brand/strand-poster.jpg?v=3"
      alt={label ?? ""}
      className="strand-video size-full"
      draggable={false}
    />
  );

  const clip = (
    <video
      ref={ref}
      className="strand-video size-full"
      src="/brand/strand.mp4?v=3"
      poster="/brand/strand-poster.jpg?v=3"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden",
        SIZE[size],
        className,
      )}
    >
      {live ? clip : frame}
    </span>
  );
}
