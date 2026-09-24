"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ScanLine } from "lucide-react";
import { cn } from "@/lib/cn";

type PhotoProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Where the placeholder label sits. Use "corner" behind headlines. */
  placeholderLabel?: "center" | "corner";
};

/**
 * Wrapper around next/image for the site's real photography.
 *
 * If a photo hasn't been dropped into /public/images yet (or fails to load),
 * it renders a branded placeholder showing the expected file path instead of
 * a broken image, so the layout always holds together. Once the file exists,
 * the real photo appears with no code changes.
 */
export default function Photo({
  src,
  alt,
  className,
  fill,
  width,
  height,
  placeholderLabel = "center",
  ...rest
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        style={fill ? undefined : { aspectRatio: `${width ?? 4} / ${height ?? 3}` }}
        className={cn(
          "flex gap-2 overflow-hidden bg-gradient-to-br from-teal-brand-600 via-teal-brand-800 to-teal-brand-950 bg-grid-dark",
          placeholderLabel === "center"
            ? "flex-col items-center justify-center text-center"
            : "items-end justify-end p-4",
          fill && "absolute inset-0 h-full w-full",
          className,
        )}
      >
        <ScanLine aria-hidden className={placeholderLabel === "center" ? "h-7 w-7 text-green-brand-400" : "h-4 w-4 text-green-brand-400"} />
        <span className="px-3 font-mono text-[11px] leading-tight text-teal-brand-200">{src}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
