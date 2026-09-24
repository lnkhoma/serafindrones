/**
 * Company-wide details used across the navbar, footer and contact sidebar.
 * Edit here once and it updates everywhere.
 *
 * Contact details come from the official Serafin Drones brochure.
 */

export type SocialNetwork = "facebook" | "instagram" | "linkedin" | "x" | "youtube";

export const SITE = {
  name: "Serafin Drones",
  tagline: "Improving farm yields through advanced agricultural drone services.",
  url: "https://serafindrones.com",
  phones: [
    { display: "+265 993 89 75 67", href: "tel:+265993897567" },
    { display: "+265 991 75 74 89", href: "tel:+265991757489" },
  ],
  /** Primary number, used in short "call us" prompts. */
  phone: "+265 993 89 75 67",
  phoneHref: "tel:+265993897567",
  /** WhatsApp is on the primary number. */
  whatsapp: "+265 993 89 75 67",
  whatsappHref: "https://wa.me/265993897567",
  email: "hello@serafindrones.com",
  address: {
    line1: "SERAFIN Technologies",
    line2: "Plot 47/4/818",
    city: "Lilongwe",
    country: "Malawi",
  },
  // "Get directions" link: office pin at 13°56'59.6"S 33°46'02.2"E (-13.949898, 33.767288).
  mapsUrl:
    "https://www.google.com/maps/place/13%C2%B056'59.6%22S+33%C2%B046'02.2%22E/@-13.9498928,33.7647131,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-13.949898!4d33.767288",
  hours: [
    { days: "Monday – Friday", time: "08:00 – 17:00" },
    { days: "Saturday, Sunday & public holidays", time: "Closed" },
  ],
  /** Only networks listed here get an icon. Add more as accounts are created. */
  socials: {
    facebook: "https://www.facebook.com/serafindrones",
  } as Partial<Record<SocialNetwork, string>>,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#solutions" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
] as const;

export const CONTACT_HREF = {
  farmDemo: "/contact?type=farm-demo",
  officeVisit: "/contact?type=office-visit",
} as const;
