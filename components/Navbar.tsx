"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ButtonLink from "@/components/ui/ButtonLink";
import { CONTACT_HREF, NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Sticky site header. The logo's wordmark is dark teal, so the bar itself is
 * white; a dark-teal accent strip across the top carries the brand colour.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-t-4 border-teal-brand bg-white/90 backdrop-blur-md transition-shadow",
        scrolled ? "shadow-card" : "shadow-none",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo priority />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand",
                    active ? "text-teal-brand" : "text-teal-brand-600 hover:bg-teal-brand-50 hover:text-teal-brand",
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-green-brand" aria-hidden />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href={CONTACT_HREF.farmDemo} className="hidden sm:inline-flex">
            Request a Demo
            <ArrowRight aria-hidden className="h-4 w-4" />
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-brand-100 text-teal-brand transition hover:bg-teal-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-teal-brand-50 bg-white lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-base font-semibold transition-colors",
                      isActive(link.href)
                        ? "bg-green-brand-50 text-teal-brand"
                        : "text-teal-brand-600 hover:bg-teal-brand-50",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <ButtonLink href={CONTACT_HREF.farmDemo} size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Request a Demo
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
