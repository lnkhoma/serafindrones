"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Photo from "@/components/ui/Photo";
import ButtonLink from "@/components/ui/ButtonLink";
import { FlightPath, ScanLines, Viewfinder } from "@/components/ui/Decor";
import { CONTACT_HREF } from "@/lib/site";

/* ---- Swap photos here: drop files into /public/images with these names. ---- */
const HERO_IMAGE = "/images/hero-drone-field.jpg";
const HERO_IMAGE_ALT = "Serafin spray drone flying low over a green crop field in Malawi";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-teal-brand-950">
      {/* Background photo + dark teal gradient overlay (~40–60%) for legibility */}
      <Photo placeholderLabel="corner" src={HERO_IMAGE} alt={HERO_IMAGE_ALT} fill priority sizes="100vw" className="-z-20 object-cover object-[center_42%]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-brand-950/90 via-teal-brand-900/60 to-teal-brand-800/40"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-teal-brand-950/70 to-transparent" />
      <ScanLines className="-z-10" />
      <FlightPath tone="dark" className="-z-10 bottom-0 right-0 hidden h-[28rem] w-[46rem] lg:block" />

      <div className="container-page grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <motion.p {...fadeUp(0)} className="eyebrow text-green-brand-300">
            Precision agriculture with drone intelligence
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            id="hero-title"
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-heading text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Smarter Farming,
            <br />
            <span className="text-green-brand-400">From Above.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-teal-brand-100 sm:text-xl">
            Improving farm yields through advanced agricultural drone services. Precision chemical
            spraying and fertilizer spreading for commercial farms and large-scale growers across Malawi.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={CONTACT_HREF.farmDemo} size="lg">
              Request a Demo
              <ArrowRight aria-hidden className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href={CONTACT_HREF.officeVisit} size="lg" variant="outline-light">
              <MapPin aria-hidden className="h-5 w-5" />
              Visit Our Office
            </ButtonLink>
          </motion.div>
        </div>

        {/* Spray-mission "telemetry" card: purely decorative, illustrative data */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:col-span-5 lg:flex lg:justify-end"
          aria-hidden
        >
          <div className="relative w-80 rounded-2xl border border-white/15 bg-teal-brand-950/55 p-6 text-white shadow-lift backdrop-blur-md">
            <Viewfinder />
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-eyebrow text-teal-brand-200">
              <span>Spray mission</span>
              <span className="flex items-center gap-2 text-green-brand-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-green-brand" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-brand" />
                </span>
                Live
              </span>
            </div>
            <p className="mt-4 font-display text-4xl font-bold">
              68<span className="text-xl text-teal-brand-200">%</span>
            </p>
            <p className="text-sm text-teal-brand-200">Field coverage, GPS-guided</p>
            {/* Completed swaths in green, remaining swaths faded */}
            <div className="mt-5 grid grid-cols-12 gap-1">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} className={`h-3 rounded-sm ${i < 25 ? "bg-green-brand/80" : "bg-white/10"}`} />
              ))}
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-xs">
              <div>
                <dt className="text-teal-brand-300">Area</dt>
                <dd className="mt-0.5 font-semibold">48.2 ha</dd>
              </div>
              <div>
                <dt className="text-teal-brand-300">Height</dt>
                <dd className="mt-0.5 font-semibold">3 m</dd>
              </div>
              <div>
                <dt className="text-teal-brand-300">Wastage</dt>
                <dd className="mt-0.5 font-semibold text-green-brand-300">Low</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
