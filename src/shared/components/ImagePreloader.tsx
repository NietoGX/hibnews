"use client";

import Image from "next/image";

interface ImagePreloaderProps {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  alt?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ImagePreloader = ({
  src,
  width = 1920,
  height = 1080,
  quality = 75,
  alt = "",
  onLoad,
  onError,
}: ImagePreloaderProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority
      onLoad={onLoad}
      onError={onError}
      className="hidden"
      aria-hidden="true"
      data-preloader="true"
    />
  );
};
