import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Check } from "lucide-react";
import Photo from "@/components/ui/Photo";
import { Viewfinder } from "@/components/ui/Decor";
import { cn } from "@/lib/cn";

export interface Service {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Tailwind object-position class to keep the subject in frame, e.g. "object-[center_40%]". */
  imagePosition?: string;
  icon: LucideIcon;
  points: string[];
  href: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-teal-brand-50 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Photo
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 1024px) 512px, (min-width: 768px) 50vw, 100vw"
          className={cn("object-cover transition duration-700 group-hover:scale-105", service.imagePosition)}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-teal-brand-950/50 to-transparent" />
        <Viewfinder className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-brand shadow-card">
          <Icon aria-hidden className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold tracking-heading text-teal-brand">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{service.description}</p>
        <ul className="mt-4 space-y-2">
          {service.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-teal-brand-700">
              <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-green-brand" />
              {p}
            </li>
          ))}
        </ul>
        <Link
          href={service.href}
          className="mt-6 inline-flex items-center gap-1 self-start rounded text-sm font-semibold text-green-brand-700 after:absolute after:inset-0 hover:text-teal-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
        >
          Ask about this service
          <span className="sr-only">: {service.title}</span>
          <ArrowUpRight aria-hidden className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
