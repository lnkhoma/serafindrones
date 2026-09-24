import type { LucideIcon } from "lucide-react";

export interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function ProcessStep({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-green-brand/50 hover:bg-white/[0.07]">
      <div className="flex items-center justify-between">
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-green-brand text-teal-brand-950">
          <Icon aria-hidden className="h-6 w-6" />
        </span>
        <span aria-hidden className="font-display text-5xl font-bold text-white/10">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 font-display text-xl font-bold tracking-heading text-white">
        <span className="sr-only">Step {index + 1}: </span>
        {step.title}
      </h3>
      <p className="mt-2 leading-relaxed text-teal-brand-100">{step.description}</p>
    </div>
  );
}
