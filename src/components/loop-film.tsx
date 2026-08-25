import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function LoopFilm({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
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

  if (reduceMotion) {
    return (
      <img
        src={poster}
        alt={label}
        className={cn("size-full object-cover", className)}
        draggable={false}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={cn("size-full object-cover", className)}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-label={label}
    />
  );
}
