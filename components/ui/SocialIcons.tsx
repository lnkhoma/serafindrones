import { SITE, type SocialNetwork } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Minimal brand glyphs drawn inline (lucide no longer ships brand icons). */
const ICONS: Record<SocialNetwork, { label: string; path: React.ReactNode }> = {
  facebook: {
    label: "Facebook",
    path: <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.8-.8H14z" fill="currentColor" transform="translate(0 -2)" />,
  },
  instagram: {
    label: "Instagram",
    path: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
      </g>
    ),
  },
  linkedin: {
    label: "LinkedIn",
    path: (
      <g fill="currentColor">
        <rect x="3" y="9" width="4" height="12" rx="0.5" />
        <circle cx="5" cy="5" r="2.2" />
        <path d="M10 9h3.8v1.7c.6-1 1.9-2 3.9-2 3.2 0 4.3 2 4.3 5.1V21h-4v-6.3c0-1.5-.3-2.7-1.9-2.7s-2.1 1.2-2.1 2.7V21h-4V9z" />
      </g>
    ),
  },
  x: {
    label: "X (Twitter)",
    path: <path d="M4 3h4.6l4.1 5.8L17.8 3H20l-6.3 7.3L21 21h-4.6l-4.5-6.3L6.4 21H4.2l6.7-7.7L4 3z" fill="currentColor" />,
  },
  youtube: {
    label: "YouTube",
    path: (
      <g>
        <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" />
        <path d="M10 9l5 3-5 3V9z" fill="var(--yt-play, #0A2022)" />
      </g>
    ),
  },
};

export default function SocialIcons({
  className,
  tone = "dark",
}: {
  className?: string;
  /** `dark` = on a teal background, `light` = on white. */
  tone?: "light" | "dark";
}) {
  // Only render networks that have a real URL in lib/site.ts.
  const links = (Object.entries(SITE.socials) as [SocialNetwork, string | undefined][]).filter(
    (entry): entry is [SocialNetwork, string] => Boolean(entry[1]),
  );
  if (!links.length) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map(([key, href]) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SITE.name} on ${ICONS[key].label}`}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand",
              tone === "dark"
                ? "border-white/15 text-teal-brand-100 [--yt-play:#0F2D2F] hover:border-green-brand hover:bg-green-brand hover:text-teal-brand-950"
                : "border-teal-brand-100 text-teal-brand [--yt-play:#fff] hover:border-green-brand hover:bg-green-brand-50 hover:text-green-brand-700",
            )}
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px]">
              {ICONS[key].path}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
