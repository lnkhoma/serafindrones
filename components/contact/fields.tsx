/**
 * Small, accessible building blocks shared by the contact form.
 * Every control gets a real <label>, and errors are linked via aria-describedby.
 */
import { forwardRef } from "react";
import { AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export const errorId = (name: string) => `${name}-error`;
export const hintId = (name: string) => `${name}-hint`;

/** Builds the aria props for a control from its error / hint state. */
export function describedBy(name: string, opts: { error?: string; hint?: string }) {
  const ids = [opts.hint && hintId(name), opts.error && errorId(name)].filter(Boolean).join(" ");
  return {
    "aria-invalid": opts.error ? ("true" as const) : ("false" as const),
    "aria-describedby": ids || undefined,
  };
}

export function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={errorId(name)} className="form-error">
      <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

export function Label({
  htmlFor,
  children,
  required,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {children}
      {required && (
        <span className="ml-0.5 text-green-brand-700" aria-hidden>
          *
        </span>
      )}
      {optional && <span className="ml-1.5 text-xs font-normal text-slate-500">(optional)</span>}
    </label>
  );
}

/** Group title for radio / checkbox sets (used as a <legend>). */
export function GroupLegend({ children, required, optional }: { children: React.ReactNode; required?: boolean; optional?: boolean }) {
  return (
    <legend className="form-label">
      {children}
      {required && (
        <span className="ml-0.5 text-green-brand-700" aria-hidden>
          *
        </span>
      )}
      {optional && <span className="ml-1.5 text-xs font-normal text-slate-500">(optional)</span>}
    </legend>
  );
}

type ChoiceProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  description?: string;
  type: "radio" | "checkbox";
};

/**
 * A selectable "chip" wrapping a native radio/checkbox, so keyboard and screen
 * reader behaviour stay native. Checked state is styled with the green accent.
 */
export const ChoiceChip = forwardRef<HTMLInputElement, ChoiceProps>(function ChoiceChip(
  { label, description, type, className, ...input },
  ref,
) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer items-start gap-3 rounded-xl border border-teal-brand-100 bg-white px-4 py-3 text-sm transition",
        "hover:border-teal-brand-200 hover:bg-off-white",
        "has-[:checked]:border-green-brand has-[:checked]:bg-green-brand-50 has-[:checked]:ring-1 has-[:checked]:ring-green-brand",
        "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-green-brand/25",
        className,
      )}
    >
      <input ref={ref} type={type} className={cn("form-check mt-0.5", type === "radio" ? "rounded-full" : "rounded")} {...input} />
      <span>
        <span className="font-semibold text-teal-brand-800">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-body">{description}</span>}
      </span>
      {type === "checkbox" && (
        <Check aria-hidden className="ml-auto hidden h-4 w-4 text-green-brand-700 group-has-[:checked]:block" />
      )}
    </label>
  );
});
