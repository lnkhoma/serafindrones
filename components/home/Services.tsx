import { Droplets, Sprout } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ServiceCard, { type Service } from "./ServiceCard";
import { CONTACT_HREF } from "@/lib/site";

/* ---- Swap photos here: drop files into /public/images with these names. ---- */
const SPRAYING_IMAGE = "/images/drone-spraying.jpg";
const SPREADING_IMAGE = "/images/drone-fertilizer.jpg";

/* Services and bullet points from the Serafin Drones brochure. */
const SERVICES: Service[] = [
  {
    title: "Drone Chemical Spraying",
    description:
      "Precise aerial application of herbicides, pesticides and fungicides, delivered evenly across every row without driving machinery through your crop.",
    image: SPRAYING_IMAGE,
    imageAlt: "Serafin agricultural drone flying over a tea estate",
    imagePosition: "object-[center_42%]",
    icon: Droplets,
    points: [
      "Herbicides, pesticides and fungicides",
      "Reduces chemical wastage",
      "No crop damage from machinery",
      "Fast and efficient application",
      "Ideal for large farms and difficult terrain",
    ],
    href: CONTACT_HREF.farmDemo,
  },
  {
    title: "Drone Fertilizer Spreading",
    description:
      "GPS-guided granular fertilizer spreading that puts nutrients exactly where your crop needs them, faster and with less labour than ground methods.",
    image: SPREADING_IMAGE,
    imageAlt: "Team member loading granular fertilizer into the drone spreader",
    imagePosition: "object-[center_62%]",
    icon: Sprout,
    points: [
      "Uniform nutrient distribution",
      "Lower labour and fuel costs",
      "GPS-guided precision",
      "Improves crop performance",
      "Suitable for estates and plantations",
    ],
    href: CONTACT_HREF.farmDemo,
  },
];

export default function Services() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative bg-off-white py-24">
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade" />
      <div className="container-page relative">
        <SectionHeading
          id="solutions-title"
          eyebrow="Our services"
          title="Chemical spraying and fertilizer spreading, done from the air"
          description="We specialise in two services for commercial farms and large individual farmers, delivered by skilled, licensed drone operators."
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
