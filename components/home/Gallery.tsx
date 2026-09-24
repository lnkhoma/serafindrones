import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

/* ---- Swap photos here: drop files into /public/images with these names. ----
 * `span` controls the tile size in the desktop grid (4 columns). */
const GALLERY = [
  { src: "/images/hero-drone-field.jpg", alt: "Serafin drone spraying a tea estate with mountains behind", caption: "Spraying on a tea estate", span: "lg:col-span-2 lg:row-span-2", position: "object-[center_40%]" },
  { src: "/images/drone-fertilizer.jpg", alt: "Team member loading fertilizer granules into the drone spreader", caption: "Loading fertilizer", span: "", position: "object-[center_60%]" },
  { src: "/images/fleet-sprayer.jpg", alt: "Pilot filling the spray tank of the SERAFIN 1 drone", caption: "Preparing SERAFIN 1", span: "", position: "object-center" },
  { src: "/images/team-photo.jpg", alt: "Serafin team and estate staff gathered around a spray drone", caption: "Demo day with estate staff", span: "lg:col-span-2", position: "object-center" },
  { src: "/images/field-briefing.jpg", alt: "Pilot briefing the crew on the flight area", caption: "Flight briefing", span: "", position: "object-[center_30%]" },
  { src: "/images/estate-walk.jpg", alt: "Estate managers walking through a tea field", caption: "Walking the estate", span: "", position: "object-[center_45%]" },
  { src: "/images/drone-spraying.jpg", alt: "Agricultural drone flying over a tea field", caption: "In flight over the canopy", span: "lg:col-span-2", position: "object-[center_42%]" },
];

export default function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="bg-white py-24">
      <div className="container-page">
        <SectionHeading
          id="gallery-title"
          eyebrow="In the field"
          title="Out on Malawian farms"
          description="Real flights, real fields and real farm teams: our drones at work on commercial estates."
        />

        <ul className="mt-14 grid grid-flow-dense auto-rows-[200px] grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
          {GALLERY.map((photo, i) => (
            <li key={photo.src} className={cn("group relative overflow-hidden rounded-2xl bg-teal-brand-900", photo.span, i === 0 && "col-span-2 row-span-2")}>
              <Reveal delay={(i % 4) * 0.06} className="absolute inset-0">
                <figure className="h-full w-full">
                  <Photo
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className={cn("object-cover transition duration-700 group-hover:scale-105", photo.position)}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-brand-950/80 to-transparent px-4 pb-3 pt-10 text-sm font-semibold text-white">
                    {photo.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
