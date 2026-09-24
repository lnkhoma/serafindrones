import { Crosshair, Eye, Handshake, Lightbulb, Recycle, ShieldCheck, Target } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ScanLines } from "@/components/ui/Decor";

/* Vision, mission and core values, as written in the Serafin Drones brochure. */
const VISION =
  "To become Malawi's leading agricultural drone service provider, driving sustainable farming through innovation, precision, and technology.";
const MISSION =
  "To support farmers in maximizing crop productivity and profitability by delivering reliable, safe, and precise UAV-based spraying and fertilizer spreading services while promoting environmentally responsible farming practices.";

const VALUES = [
  { icon: Lightbulb, title: "Innovation", text: "Using cutting-edge drone technology" },
  { icon: Crosshair, title: "Precision", text: "Accurate application, every flight" },
  { icon: Recycle, title: "Sustainability", text: "Environmentally responsible farming" },
  { icon: ShieldCheck, title: "Safety & Compliance", text: "Safe operations and regulations" },
  { icon: Handshake, title: "Partnership", text: "Working closely with farmers" },
];

export default function MissionValues() {
  return (
    <section aria-labelledby="values-title" className="relative overflow-hidden bg-teal-brand-900 py-24">
      <ScanLines />
      <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade" />
      <div className="container-page relative">
        <SectionHeading
          id="values-title"
          tone="dark"
          eyebrow="Smart & sustainable farming"
          title="What drives us"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[
            { icon: Eye, label: "Our vision", text: VISION },
            { icon: Target, label: "Our mission", text: MISSION },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1} className="h-full">
              <div className="flex h-full gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-brand text-teal-brand-950">
                  <item.icon aria-hidden className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-heading text-white">{item.label}</h3>
                  <p className="mt-2 leading-relaxed text-teal-brand-100">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-16 text-center font-display text-sm font-semibold uppercase tracking-eyebrow text-green-brand-300">
          Our core values
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map((v, i) => (
            <li key={v.title}>
              <Reveal delay={i * 0.06} className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center">
                <v.icon aria-hidden className="mx-auto h-7 w-7 text-green-brand-400" />
                <p className="mt-3 font-display font-bold text-white">{v.title}</p>
                <p className="mt-1 text-sm text-teal-brand-100">{v.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
