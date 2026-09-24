import { cn } from "@/lib/cn";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use `dark` when the section background is teal. */
  tone?: "light" | "dark";
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  id,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "eyebrow",
          align === "center" && "justify-center",
          dark ? "text-green-brand-300" : "text-green-brand-700",
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-3 font-display text-3xl font-bold tracking-heading sm:text-4xl",
          dark ? "text-white" : "text-teal-brand",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-teal-brand-100" : "text-body")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
