import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import Sidebar from "@/components/contact/Sidebar";
import Reveal from "@/components/ui/Reveal";
import { FlightPath, ScanLines } from "@/components/ui/Decor";
import { isRequestType, type RequestType } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Request a Demo or Visit Us",
  description:
    "Book a drone spraying or fertilizer spreading demo on your farm, or visit the Serafin Drones office in Lilongwe. We reply within 1–2 business days.",
};

export default function ContactPage({ searchParams }: { searchParams: { type?: string | string[] } }) {
  // Pre-select the request type from ?type=farm-demo | office-visit (defaults to farm demo).
  const typeParam = Array.isArray(searchParams.type) ? searchParams.type[0] : searchParams.type;
  const initialType: RequestType = isRequestType(typeParam) ? typeParam : "farm-demo";

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-teal-brand-900 pb-32 pt-16 sm:pt-20">
        <ScanLines />
        <FlightPath tone="dark" className="right-0 top-0 h-full w-full opacity-70 lg:w-2/3" />
        <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade" />
        <div className="container-page relative">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-green-brand-300">Contact & bookings</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-heading text-white sm:text-5xl">
              Let&apos;s get your farm in the air
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-teal-brand-100">
              Tell us a little about your farm and what you&apos;d like to achieve. We&apos;ll plan a demo
              flight over your fields, or set up a visit to our Lilongwe office to meet the team and see the fleet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="relative bg-off-white pb-24">
        {/* Drone-inspired decoration behind the form */}
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <FlightPath className="bottom-0 left-0 h-[40rem] w-full" />

        <div className="container-page relative -mt-20 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ContactForm initialType={initialType} />
          </div>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
