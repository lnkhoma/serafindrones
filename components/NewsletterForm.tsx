"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { newsletterSchema, type NewsletterValues } from "@/lib/schema";

/**
 * Footer newsletter signup. Posts to /api/newsletter, which appends the email
 * to a "Newsletter" tab in the same Google Sheet as the contact form.
 */
export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (values: NewsletterValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm text-white">
        <CheckCircle2 aria-hidden className="h-5 w-5 text-green-brand" />
        You&apos;re subscribed. Welcome aboard!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@farm.mw"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-teal-brand-300 focus:border-green-brand focus:outline-none focus:ring-4 focus:ring-green-brand/25"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Subscribe"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-brand text-teal-brand-950 transition hover:bg-green-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-brand focus-visible:ring-offset-2 focus-visible:ring-offset-teal-brand-900 disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-red-300">
          {errors.email.message}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
          <AlertCircle aria-hidden className="h-4 w-4" />
          Couldn&apos;t subscribe right now. Please try again.
        </p>
      )}
    </form>
  );
}
