import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;
    node.muted = true;
    const play = () => {
      void node.play().catch(() => {});
    };
    play();
    node.addEventListener("canplay", play);
    return () => node.removeEventListener("canplay", play);
  }, [reduceMotion]);

  const frame = (
    <img
      src="/brand/strand-poster.jpg?v=2"
      alt={label ?? ""}
      className="strand-video size-full"
      draggable={false}
    />
  );

  const clip = (
    <video
      ref={ref}
      className="strand-video size-full"
      src="/brand/strand.mp4?v=2"
      poster="/brand/strand-poster.jpg?v=2"
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
      {reduceMotion ? frame : clip}
    </span>
  );
}
