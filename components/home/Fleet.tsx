"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Crosshair, Mountain, Package, Sprout, Target } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Photo from "@/components/ui/Photo";
import { Viewfinder } from "@/components/ui/Decor";
import { cn } from "@/lib/cn";

/* ---- Swap photos here: drop files into /public/images with these names. ---- */
const SPRAYER_IMAGE = "/images/fleet-sprayer.jpg";
const SPREADER_IMAGE = "/images/fleet-spreader.jpg";

/*
 * Drone setups. Details are taken from the brochure. To add model-specific
 * specs (flight time, tank size, coverage per hour), add rows to `specs`.
 */
const FLEET = [
  {
    id: "sprayer",
    name: "Spraying setup",
    role: "Drone chemical spraying",
    image: SPRAYER_IMAGE,
    imageAlt: "Serafin pilot filling the spray tank of the SERAFIN 1 agricultural drone",
    summary:
      "Our agricultural drones carry liquid crop protection products and apply them evenly from just above the canopy, reaching areas ground machinery can't.",
    specs: [
      { icon: Package, label: "Products", value: "Herbicides, pesticides and fungicides" },
      { icon: Crosshair, label: "Guidance", value: "GPS-guided flight paths" },
      { icon: Target, label: "Application", value: "Targeted, with reduced chemical wastage" },
      { icon: Mountain, label: "Best suited to", value: "Large farms and difficult terrain" },
      { icon: Sprout, label: "Crop impact", value: "No crop damage from machinery" },
      { icon: BadgeCheck, label: "Operated by", value: "Skilled, licensed drone pilots" },
    ],
  },
  {
    id: "spreader",
    name: "Spreading setup",
    role: "Drone fertilizer spreading",
    image: SPREADER_IMAGE,
    imageAlt: "Serafin team preparing a drone fitted with a fertilizer spreader on a tea estate",
    summary:
      "Fitted with a granular spreader, the same aircraft distributes fertilizer uniformly across estates and plantations, with lower labour and fuel costs.",
    specs: [
      { icon: Package, label: "Products", value: "Granular fertilizer" },
      { icon: Crosshair, label: "Guidance", value: "GPS-guided precision" },
      { icon: Target, label: "Application", value: "Uniform nutrient distribution" },
      { icon: Mountain, label: "Best suited to", value: "Estates and plantations" },
      { icon: Sprout, label: "Crop impact", value: "Improves crop performance" },
      { icon: BadgeCheck, label: "Operated by", value: "Skilled, licensed drone pilots" },
    ],
  },
];

export default function Fleet() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const drone = FLEET[active];

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = FLEET.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section id="fleet" aria-labelledby="fleet-title" className="relative bg-off-white py-24">
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade" />
      <div className="container-page relative">
        <SectionHeading
          id="fleet-title"
          eyebrow="Our technology"
          title="Precision agriculture technology"
          description="Modern agricultural drones, configured for spraying or spreading and flown by skilled, licensed operators."
        />

        <div
          role="tablist"
          aria-label="Drone setups"
          onKeyDown={onKeyDown}
          className="mx-auto mt-12 flex w-full max-w-md gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-card ring-1 ring-teal-brand-50"
        >
          {FLEET.map((d, i) => (
            <button
              key={d.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${d.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${d.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "flex-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand",
                i === active ? "bg-teal-brand text-white shadow-card" : "text-teal-brand-600 hover:bg-teal-brand-50",
              )}
            >
              {d.name}
              <span className={cn("block text-xs font-normal", i === active ? "text-green-brand-300" : "text-teal-brand-400")}>
                {d.role}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={drone.id}
            role="tabpanel"
            id={`panel-${drone.id}`}
            aria-labelledby={`tab-${drone.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid items-stretch gap-8 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand lg:grid-cols-2"
          >
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-teal-brand-900 lg:min-h-[460px] shadow-lift">
              <Photo src={drone.image} alt={drone.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-teal-brand-950/70 via-transparent to-transparent" />
              <Viewfinder />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-eyebrow text-green-brand-300">{drone.role}</p>
                <p className="font-display text-3xl font-bold tracking-heading">{drone.name}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-card ring-1 ring-teal-brand-50 sm:p-8">
              <h3 className="font-display text-2xl font-bold tracking-heading text-teal-brand">
                {drone.name} <span className="font-medium text-teal-brand-400">· {drone.role}</span>
              </h3>
              <p className="mt-3 leading-relaxed">{drone.summary}</p>

              <table className="mt-6 w-full text-left text-sm">
                <caption className="sr-only">{drone.role} details</caption>
                <tbody className="divide-y divide-teal-brand-50">
                  {drone.specs.map((s) => (
                    <tr key={s.label}>
                      <th scope="row" className="py-3 pr-4 font-medium text-teal-brand-500">
                        <span className="flex items-center gap-2.5">
                          <s.icon aria-hidden className="h-4 w-4 text-green-brand" />
                          {s.label}
                        </span>
                      </th>
                      <td className="py-3 font-semibold text-teal-brand-900">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
