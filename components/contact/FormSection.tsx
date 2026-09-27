/**
 * A numbered, titled group of form fields. Rendered as a <fieldset> so screen
 * readers announce the section title with each field inside it.
 */
export default function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-teal-brand-50 pt-8 first:border-t-0 first:pt-0">
      <legend className="float-left mb-6 flex w-full items-start gap-4">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-brand font-display text-sm font-bold text-white"
        >
          {String(step).padStart(2, "0")}
        </span>
        <span>
          <span className="block font-display text-xl font-bold tracking-heading text-teal-brand">
            <span className="sr-only">Section {step}: </span>
            {title}
          </span>
          {description && <span className="mt-1 block text-sm text-body">{description}</span>}
        </span>
      </legend>
      <div className="clear-both grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
