import { useState } from "react";
import placeholder from "../assets/products/placeholder.svg";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Image that falls back to a local placeholder if the URL is empty or fails to load. */
function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const resolved = src && src !== failedSrc ? src : placeholder;

  return (
    <img
      src={resolved}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
      className={`object-cover ${className}`}
    />
  );
}

export default ProductImage;
