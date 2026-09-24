import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline-light" | "outline-dark" | "ghost-light";

/** Shared button styles. Green is reserved for primary actions. */
export const buttonClasses = (variant: Variant = "primary", size: "md" | "lg" = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm",
    variant === "primary" &&
      "bg-green-brand text-teal-brand-950 shadow-[0_8px_24px_-10px_rgba(74,164,76,0.9)] hover:-translate-y-0.5 hover:bg-green-brand-400",
    variant === "outline-light" &&
      "border border-white/40 text-white backdrop-blur-sm hover:border-white hover:bg-white/10 focus-visible:ring-offset-teal-brand-900",
    variant === "outline-dark" &&
      "border border-teal-brand-200 text-teal-brand hover:border-teal-brand hover:bg-teal-brand-50",
    variant === "ghost-light" && "text-white hover:bg-white/10",
  );

interface ButtonLinkProps extends React.ComponentProps<typeof Link> {
  variant?: Variant;
  size?: "md" | "lg";
}

export default function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses(variant, size), className)} {...props} />;
}
