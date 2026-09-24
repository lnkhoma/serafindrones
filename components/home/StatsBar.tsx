import Reveal from "@/components/ui/Reveal";

/* Key facts from the Serafin Drones brochure. Swap in measured figures once available. */
const STATS = [
  { value: "Nationwide", label: "Mobile drone units ready to deploy across Malawi" },
  { value: "Licensed", label: "Skilled and licensed drone operators" },
  { value: "GPS-guided", label: "Precise, uniform application every flight" },
  { value: "Less input", label: "Less chemical, water, labour and time" },
];

/* "Who We Serve" from the brochure. */
const WHO_WE_SERVE = [
  "Commercial & estate farms",
  "Large individual farmers",
  "Agricultural cooperatives",
  "Agribusinesses",
  "Government & NGO programs",
];

export default function StatsBar() {
  return (
    <section aria-label="Why farmers work with Serafin Drones" className="relative border-b border-teal-brand-50 bg-off-white">
      <div className="container-page relative z-10 -mt-10">
        <Reveal>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-teal-brand-50 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.value}
                className={`flex flex-col p-6 sm:p-8 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${
                  i === 2 ? "lg:border-l" : ""
                } border-teal-brand-50`}
              >
                <dt className="mt-1 text-sm text-body">{s.label}</dt>
                <dd className="order-first font-display text-2xl font-bold tracking-heading text-teal-brand sm:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="container-page flex flex-col items-center gap-4 py-10 lg:flex-row lg:justify-center lg:gap-8">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-teal-brand-400">Who we serve</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {WHO_WE_SERVE.map((t) => (
            <li key={t} className="font-display text-sm font-semibold text-teal-brand-500">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
