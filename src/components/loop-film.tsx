import { useEffect, useState } from "react";
import { useLoopingClip } from "@/lib/use-looping-clip";
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
  const [reduceMotion, setReduceMotion] = useState(false);
  const ref = useLoopingClip(!reduceMotion);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

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
