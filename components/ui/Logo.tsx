"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Logo files (transparent PNGs, trimmed to the artwork, 1914×629):
 *  - dark:  /logo.png       original teal + green, for light backgrounds
 *  - light: /logo-light.png teal parts turned white, green kept, for teal backgrounds
 */
const LOGO_SRC = { dark: "/logo.png", light: "/logo-light.png" } as const;
const LOGO_WIDTH = 1914;
const LOGO_HEIGHT = 629;

/**
 * Brand logo linking home. If the image file is missing it falls back to an
 * inline SVG mark + wordmark so the header never breaks.
 */
export default function Logo({
  className,
  imageClassName = "h-10 w-auto sm:h-12",
  priority,
  variant = "dark",
}: {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** `light` for dark (teal) backgrounds. */
  variant?: "dark" | "light";
}) {
  const [failed, setFailed] = useState(false);
  const light = variant === "light";

  return (
    <Link
      href="/"
      aria-label="Serafin Drones, home"
      className={cn(
        "inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand focus-visible:ring-offset-2",
        light && "focus-visible:ring-offset-teal-brand-900",
        className,
      )}
    >
      {failed ? (
        <span className="flex items-center gap-2.5">
          <DroneMark className="h-9 w-9" light={light} />
          <span className="flex flex-col leading-none">
            <span className={cn("font-display text-lg font-bold tracking-[0.12em]", light ? "text-white" : "text-teal-brand")}>SERAFIN</span>
            <span className={cn("font-display text-[10px] font-semibold tracking-[0.42em]", light ? "text-teal-brand-100" : "text-teal-brand-500")}>DRONES</span>
          </span>
        </span>
      ) : (
        <Image
          src={LOGO_SRC[variant]}
          alt="Serafin Drones"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          sizes="200px"
          priority={priority}
          className={imageClassName}
          onError={() => setFailed(true)}
        />
      )}
    </Link>
  );
}

/** Simplified drone mark: four rotors, teal body, green "eye". */
export function DroneMark({ className, light }: { className?: string; light?: boolean }) {
  const body = light ? "#FFFFFF" : "#194649";
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} fill="none">
      <g stroke={body} strokeWidth="3" strokeLinecap="round">
        <path d="M14 14l7 7M34 14l-7 7M14 34l7-7M34 34l-7-7" />
      </g>
      {[
        [11, 11],
        [37, 11],
        [11, 37],
        [37, 37],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6.5" stroke={body} strokeWidth="2.5" />
      ))}
      <rect x="16" y="16" width="16" height="16" rx="5" fill={body} />
      <circle cx="24" cy="24" r="4.5" fill="#4AA44C" />
      <circle cx="25.5" cy="22.5" r="1.3" fill="#fff" />
    </svg>
  );
}
