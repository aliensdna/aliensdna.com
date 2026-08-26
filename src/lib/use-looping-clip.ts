import { useEffect, useRef } from "react";

/** Keep a muted inline clip looping, and only play it while on screen. */
export function useLoopingClip(active: boolean) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return;

    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "");

    const play = () => {
      void node.play().catch(() => {});
    };
    const restart = () => {
      try {
        node.currentTime = 0;
      } catch {
        /* ignore seek errors */
      }
      play();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
        else node.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(node);

    node.addEventListener("ended", restart);
    node.addEventListener("canplay", play);
    play();

    return () => {
      io.disconnect();
      node.removeEventListener("ended", restart);
      node.removeEventListener("canplay", play);
    };
  }, [active]);

  return ref;
}
