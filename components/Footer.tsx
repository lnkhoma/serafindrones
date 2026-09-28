import Link from "next/link";
import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import SocialIcons from "@/components/ui/SocialIcons";
import { FlightPath } from "@/components/ui/Decor";
import { CONTACT_HREF, NAV_LINKS, SITE } from "@/lib/site";

const SERVICE_LINKS = [
  { label: "Drone Chemical Spraying", href: "/#solutions" },
  { label: "Drone Fertilizer Spreading", href: "/#solutions" },
  { label: "Our Technology", href: "/#fleet" },
  { label: "Request a Farm Demo", href: CONTACT_HREF.farmDemo },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const linkClass =
    "rounded text-sm text-teal-brand-100 transition-colors hover:text-green-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand";

  return (
    <footer className="relative overflow-hidden bg-teal-brand-900 text-teal-brand-100">
      <FlightPath tone="dark" className="-right-20 top-0 h-80 w-[40rem] opacity-40" />
      <div className="absolute inset-0 bg-grid-dark mask-fade opacity-60" aria-hidden />

      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          {/* Light logo variant: teal parts rendered white for the dark footer. */}
          <Logo variant="light" imageClassName="h-12 w-auto sm:h-14" />
          <p className="mt-5 max-w-sm leading-relaxed">{SITE.tagline}</p>
        </div>

        {/* Links */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4">
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-eyebrow text-white">Company</h2>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={CONTACT_HREF.officeVisit} className={linkClass}>
                  Visit our office
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-eyebrow text-white">Services</h2>
            <ul className="mt-4 space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-4">
          <h2 className="font-display text-sm font-semibold uppercase tracking-eyebrow text-white">Get in touch</h2>
          <address className="mt-4 space-y-4 not-italic">
            <p className="flex gap-3 text-sm">
              <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-green-brand" />
              <span>
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
                <br />
                {SITE.address.city}, {SITE.address.country}
              </span>
            </p>
            {SITE.phones.map((p) => (
              <a key={p.href} href={p.href} className={`flex gap-3 ${linkClass}`}>
                <Phone aria-hidden className="h-5 w-5 shrink-0 text-green-brand" />
                {p.display}
              </a>
            ))}
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className={`flex gap-3 ${linkClass}`}>
              <MessageCircle aria-hidden className="h-5 w-5 shrink-0 text-green-brand" />
              WhatsApp {SITE.whatsapp}
            </a>
            <a href={`mailto:${SITE.email}`} className={`flex gap-3 ${linkClass}`}>
              <Mail aria-hidden className="h-5 w-5 shrink-0 text-green-brand" />
              {SITE.email}
            </a>
            <a href={SITE.url} className={`flex gap-3 ${linkClass}`}>
              <Globe aria-hidden className="h-5 w-5 shrink-0 text-green-brand" />
              {SITE.url.replace(/^https?:\/\//, "")}
            </a>
          </address>
          <SocialIcons className="mt-6" />
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-teal-brand-200 sm:flex-row">
          <p>© {year} Serafin Drones. All rights reserved.</p>
          <p>Serving farms across Malawi, from Lilongwe.</p>
        </div>
      </div>
    </footer>
  );
}
