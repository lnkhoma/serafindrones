import { Quote } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  metric: { value: string; label: string };
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-card ring-1 ring-teal-brand-50">
      <div className="flex items-start justify-between gap-4">
        <Quote aria-hidden className="h-8 w-8 text-green-brand" />
        <div className="rounded-xl bg-green-brand-50 px-3 py-2 text-right ring-1 ring-green-brand-100">
          <p className="font-display text-xl font-bold text-teal-brand">{testimonial.metric.value}</p>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-green-brand-700">{testimonial.metric.label}</p>
        </div>
      </div>
      <blockquote className="mt-5 flex-1 leading-relaxed text-teal-brand-800">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-teal-brand-50 pt-5">
        <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-brand font-display text-sm font-bold text-white">
          {initials}
        </span>
        <span>
          <span className="block font-semibold text-teal-brand">{testimonial.name}</span>
          <span className="block text-sm">
            {testimonial.role} · {testimonial.location}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
