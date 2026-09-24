import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";

/*
 * Add real, approved client quotes here. The section stays hidden while this
 * list is empty, so no placeholder quotes are shown to visitors.
 * Example entry:
 *   { quote: "…", name: "Full Name", role: "Estate Manager", location: "Tea estate, Thyolo",
 *     metric: { value: "−28%", label: "Chemical use" } },
 */
const TESTIMONIALS: Testimonial[] = [];

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="relative bg-off-white py-24">
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Results from the field"
          title="Farmers who've seen it from above"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full">
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
