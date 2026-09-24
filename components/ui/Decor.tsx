import { cn } from "@/lib/cn";

/**
 * Decorative, drone-inspired background motifs. All are aria-hidden and
 * pointer-events-none so they never interfere with content or assistive tech.
 */

/** A dotted flight path with waypoints, like a drone mission plan. */
export function FlightPath({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const stroke = tone === "dark" ? "rgba(138,203,139,0.45)" : "rgba(25,70,73,0.18)";
  const dot = tone === "dark" ? "#8ACB8B" : "#4AA44C";
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 400"
      fill="none"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute", className)}
    >
      <path
        d="M20 360 C 120 300, 80 180, 200 160 S 360 240, 420 140 S 540 40, 590 60"
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      {[
        [20, 360],
        [200, 160],
        [420, 140],
        [590, 60],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="9" stroke={dot} strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="3.5" fill={dot} />
        </g>
      ))}
    </svg>
  );
}

/** Horizontal scan lines + a slow sweeping scan bar. */
export function ScanLines({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-scanlines" />
      <div className="absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-green-brand/10 to-transparent motion-reduce:hidden" />
    </div>
  );
}

/** Corner brackets like a camera viewfinder. Place inside a `relative` box. */
export function Viewfinder({ className }: { className?: string }) {
  const corner = "absolute h-5 w-5 border-green-brand";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-3", className)}>
      <span className={cn(corner, "left-0 top-0 rounded-tl-md border-l-2 border-t-2")} />
      <span className={cn(corner, "right-0 top-0 rounded-tr-md border-r-2 border-t-2")} />
      <span className={cn(corner, "bottom-0 left-0 rounded-bl-md border-b-2 border-l-2")} />
      <span className={cn(corner, "bottom-0 right-0 rounded-br-md border-b-2 border-r-2")} />
    </div>
  );
}
