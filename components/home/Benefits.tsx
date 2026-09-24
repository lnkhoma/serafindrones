import { BadgeCheck, Cpu, Leaf, PiggyBank, Timer, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import { Viewfinder } from "@/components/ui/Decor";

/* ---- Swap photos here: drop files into /public/images with these names. ---- */
const TEAM_IMAGE = "/images/team-photo.jpg";
const TEAM_IMAGE_ALT = "The Serafin Drones team with estate staff beside a spray drone on a tea estate";
const FIELD_IMAGE = "/images/field-briefing.jpg";
const FIELD_IMAGE_ALT = "Serafin pilot in a hi-vis vest planning a flight path in the field";

/* "Why Choose Serafin Technology?" from the brochure. */
const BENEFITS = [
  { icon: Cpu, title: "Precision agriculture technology", text: "Modern agricultural drones with GPS-guided application on every flight." },
  { icon: TrendingUp, title: "Improved crop yields", text: "Timely, even treatment helps your crop reach its full potential." },
  { icon: PiggyBank, title: "Reduced input costs", text: "Less chemical, water, labour and fuel for every hectare treated." },
  { icon: Timer, title: "Fast service delivery", text: "Mobile drone units ready to deploy to farms across Malawi." },
  { icon: Leaf, title: "Environmentally responsible", text: "Targeted application cuts wastage and protects surrounding land." },
  { icon: BadgeCheck, title: "Skilled, licensed operators", text: "Trained and licensed drone pilots who follow safe operating practice." },
];

export default function Benefits() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        {/* Team imagery */}
        <Reveal className="relative pb-10 sm:pb-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Photo src={TEAM_IMAGE} alt={TEAM_IMAGE_ALT} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <Viewfinder />
          </div>
          <div className="absolute -bottom-10 -right-2 hidden w-40 overflow-hidden rounded-2xl border-4 border-white shadow-lift sm:block lg:-right-6">
            <div className="relative aspect-[3/4]">
              <Photo src={FIELD_IMAGE} alt={FIELD_IMAGE_ALT} fill sizes="160px" className="object-cover" />
            </div>
          </div>
          <div className="absolute -left-2 top-6 rounded-2xl bg-teal-brand px-5 py-4 text-white shadow-lift lg:-left-6">
            <p className="font-display text-2xl font-bold">Nationwide</p>
            <p className="text-xs uppercase tracking-eyebrow text-teal-brand-100">Mobile drone units</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="Who we are"
            title="Built for the farms that feed Malawi"
            description="Serafin Drones started with one question from a rice farmer in Salima:"
          />
          <blockquote className="mt-5 border-l-4 border-green-brand bg-green-brand-50 py-4 pl-5 pr-4 text-lg font-medium italic leading-relaxed text-teal-brand-800">
            “How can I sort out the labour issue at the peak of rice farming, when the need for labour is high and
            labourers are not willing to show up?”
          </blockquote>
          <p className="mt-5 leading-relaxed">
            Today we are an agricultural drone services company based in Malawi, committed to modern, efficient and
            sustainable farming. We work closely with large-scale and commercial farmers, using advanced drone
            technology to improve productivity, reduce input costs and optimise farm operations.
          </p>
          <p className="mt-4 leading-relaxed">
            Our mission is simple: help farmers grow more using less. Less chemical, less water, less labour, and less
            time.
          </p>

          <h3 className="mt-10 font-display text-sm font-semibold uppercase tracking-eyebrow text-teal-brand-500">
            Why choose Serafin
          </h3>
          <ul className="mt-5 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <li key={b.title}>
                <Reveal delay={i * 0.06} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-brand-50 text-green-brand-700 ring-1 ring-green-brand-100">
                    <b.icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-teal-brand">{b.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed">{b.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
