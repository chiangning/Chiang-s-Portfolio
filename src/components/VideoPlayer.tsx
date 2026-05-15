"use client";

import { useEffect, useRef, useState } from "react";

export const VideoPlayer = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  const posterSrc = src.replace(/\.mp4$/i, '.jpg');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (shouldLoad && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (isMounted && error.name !== 'AbortError') {
            console.error("Video autoplay failed:", error);
          }
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [shouldLoad, src]);

  return (
    <video
      ref={videoRef}
      poster={posterSrc}
      src={shouldLoad ? src : undefined}
      autoPlay={shouldLoad}
      loop
      muted
      playsInline
      preload={shouldLoad ? "auto" : "none"}
      className={className}
    />
  );
};
