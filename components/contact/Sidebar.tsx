import { Clock, ExternalLink, Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Photo from "@/components/ui/Photo";
import SocialIcons from "@/components/ui/SocialIcons";
import { Viewfinder } from "@/components/ui/Decor";
import { SITE } from "@/lib/site";

/* ---- Swap photos here: drop files into /public/images with these names. ---- */
const MAP_IMAGE = "/images/office-map.jpg";
const TEAM_IMAGE = "/images/team-photo.jpg";

const cardClass = "rounded-2xl bg-white p-6 shadow-card ring-1 ring-teal-brand-50";
const headingClass = "flex items-center gap-2 font-display text-lg font-bold tracking-heading text-teal-brand";

export default function Sidebar() {
  return (
    <aside aria-label="Office and contact information" className="space-y-5">
      {/* Visit us + map */}
      <section className={`${cardClass} overflow-hidden p-0`}>
        {/*
          Static placeholder map. To switch to a live Google Map later, replace this
          block with an <iframe> embed, e.g.:
            <iframe
              title="Serafin Drones office location"
              src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
              className="h-48 w-full border-0" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          (Google Maps → Share → Embed a map → copy the src URL.)
        */}
        <div className="relative h-48 bg-teal-brand-100">
          <Photo src={MAP_IMAGE} alt={`Map showing the Serafin Drones office in ${SITE.address.city}`} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
          <span aria-hidden className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-full items-center justify-center">
            <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-green-brand/50" />
            <MapPin className="relative h-9 w-9 fill-green-brand text-teal-brand-950" />
          </span>
        </div>
        <div className="p-6">
          <h2 className={headingClass}>
            <MapPin aria-hidden className="h-5 w-5 text-green-brand" />
            Visit us
          </h2>
          <address className="mt-3 not-italic leading-relaxed">
            {SITE.address.line1}
            <br />
            {SITE.address.line2}
            <br />
            {SITE.address.city}, {SITE.address.country}
          </address>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-green-brand-700 hover:text-teal-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
          >
            Get directions
            <ExternalLink aria-hidden className="h-4 w-4" />
            <span className="sr-only">(opens Google Maps in a new tab)</span>
          </a>
        </div>
      </section>

      {/* Office hours */}
      <section className={cardClass}>
        <h2 className={headingClass}>
          <Clock aria-hidden className="h-5 w-5 text-green-brand" />
          Office hours
        </h2>
        <dl className="mt-4 divide-y divide-teal-brand-50 text-sm">
          {SITE.hours.map((h) => (
            <div key={h.days} className="flex justify-between gap-4 py-2.5">
              <dt>{h.days}</dt>
              <dd className="font-semibold text-teal-brand-800">{h.time}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Direct contact */}
      <section className="rounded-2xl bg-teal-brand-900 p-6 text-white shadow-card">
        <h2 className="font-display text-lg font-bold tracking-heading">Prefer to talk now?</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            ...SITE.phones.map((p) => ({ icon: Phone, label: p.display, href: p.href, sr: "Call" })),
            { icon: MessageCircle, label: `WhatsApp ${SITE.whatsapp}`, href: SITE.whatsappHref, sr: "Message on" },
            { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}`, sr: "Email" },
            { icon: Globe, label: SITE.url.replace(/^https?:\/\//, ""), href: SITE.url, sr: "Website" },
          ].map((c) => (
            <li key={c.href}>
              <a
                href={c.href}
                {...(c.href.startsWith("https://wa.me") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:border-green-brand hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
              >
                <c.icon aria-hidden className="h-5 w-5 text-green-brand" />
                <span className="sr-only">{c.sr} </span>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <SocialIcons className="mt-5" />
      </section>

      {/* Office / team photo */}
      <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
        <Photo src={TEAM_IMAGE} alt="The Serafin Drones team with estate staff and a spray drone" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
        <Viewfinder />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-brand-950/80 to-transparent px-5 pb-4 pt-10 text-sm font-semibold text-white">
          Come and meet the team
        </figcaption>
      </figure>
    </aside>
  );
}
