import { ClipboardList, Crosshair, Radar, ScanSearch } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FlightPath, ScanLines } from "@/components/ui/Decor";
import ProcessStep, { type Step } from "./ProcessStep";

const STEPS: Step[] = [
  {
    title: "Survey",
    description: "We visit your farm, map field boundaries and obstacles, and agree the crop, product and timing with you.",
    icon: Radar,
  },
  {
    title: "Analyze",
    description: "We plan GPS-guided flight paths and application rates, and pick a safe weather window for the job.",
    icon: ScanSearch,
  },
  {
    title: "Act",
    description: "Our licensed pilots spray or spread precisely and evenly, with no machinery driving through your crop.",
    icon: Crosshair,
  },
  {
    title: "Report",
    description: "You receive a clear record of the areas treated, products applied and follow-up recommendations.",
    icon: ClipboardList,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="relative overflow-hidden bg-teal-brand-900 py-24"
    >
      <ScanLines />
      <FlightPath tone="dark" className="left-0 top-10 h-full w-full opacity-60" />

      <div className="container-page relative">
        <SectionHeading
          id="how-title"
          tone="dark"
          eyebrow="How it works"
          title="From first flight to final report in four steps"
          description="A simple, safe process that fits around your season, from first visit to final report."
        />

        <div className="relative mt-16">
          {/* Dashed "flight line" connecting the steps on large screens */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-8 right-8 top-[3.25rem] hidden border-t-2 border-dashed border-green-brand/30 lg:block"
          />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.12} className="h-full">
                  <ProcessStep step={step} index={i} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
