import { ArrowRight, MapPin } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import { FlightPath, ScanLines } from "@/components/ui/Decor";
import { CONTACT_HREF } from "@/lib/site";

/* ---- Swap photo here ---- */
const CTA_IMAGE = "/images/salima-rice-fields.jpg";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export default function CTASection({
  title = "Ready to see your farm from above?",
  description = "Book an on-farm demo flight, or visit our Lilongwe office to meet the team and see our drones up close.",
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-20">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-teal-brand px-6 py-16 text-center shadow-lift sm:px-12 lg:py-20">
            <Photo placeholderLabel="corner" src={CTA_IMAGE} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-brand-900/90 via-teal-brand/70 to-teal-brand-950/90" />
            <ScanLines className="-z-10" />
            <FlightPath tone="dark" className="-z-10 inset-0 h-full w-full" />

            <h2 id="cta-title" className="mx-auto max-w-3xl font-display text-3xl font-bold tracking-heading text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-teal-brand-100">{description}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={CONTACT_HREF.farmDemo} size="lg">
                Request a Farm Demo
                <ArrowRight aria-hidden className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href={CONTACT_HREF.officeVisit} size="lg" variant="outline-light">
                <MapPin aria-hidden className="h-5 w-5" />
                Visit Us in Lilongwe
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
