"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type DefaultValues, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Building2, CheckCircle2, ChevronDown, Loader2, RotateCcw, Send, Tractor } from "lucide-react";
import FormSection from "./FormSection";
import DistrictSelect from "./DistrictSelect";
import { ChoiceChip, FieldError, GroupLegend, Label, describedBy, errorId } from "./fields";
import { buttonClasses } from "@/components/ui/ButtonLink";
import {
  AREA_UNITS,
  CONTACT_METHODS,
  CONTACT_METHOD_LABELS,
  CROPS,
  IRRIGATION_TYPES,
  SERVICES,
  WATER_SOURCES,
  WATER_SOURCE_LABELS,
  contactSchema,
  type ContactFormValues,
  type RequestType,
} from "@/lib/schema";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "success" | "error";

/** Copy that adapts to the selected request type. */
const TYPE_COPY: Record<RequestType, { title: string; description: string; dateLabel: string; dateHint: string; icon: typeof Tractor }> = {
  "farm-demo": {
    title: "Request a demo on my farm",
    description: "Our pilots fly a live demo over your own fields.",
    dateLabel: "Preferred farm visit date",
    dateHint: "We'll confirm the exact day based on weather and pilot availability.",
    icon: Tractor,
  },
  "office-visit": {
    title: "Visit your office in Lilongwe",
    description: "Meet the team and see the fleet up close.",
    dateLabel: "Preferred office visit date",
    dateHint: "Our office is open Monday to Friday, 08:00–17:00. We'll confirm a time.",
    icon: Building2,
  },
};

const buildDefaults = (requestType: RequestType): DefaultValues<ContactFormValues> => ({
  requestType,
  fullName: "",
  jobTitle: "",
  phone: "",
  email: "",
  contactMethod: "phone",
  orgName: "",
  district: "",
  farmSizeUnit: "hectares",
  cultivatedAreaUnit: "hectares",
  crops: [],
  otherCrop: "",
  irrigationType: "",
  services: [],
  preferredDate: "",
  notes: "",
  consent: false,
});

/** Today's date as YYYY-MM-DD in the visitor's local timezone. */
const localToday = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export default function ContactForm({ initialType }: { initialType: RequestType }) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [minDate, setMinDate] = useState<string>();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: buildDefaults(initialType),
  });

  const requestType = watch("requestType") ?? initialType;
  const crops = watch("crops") ?? [];
  const waterSource = watch("waterSource");
  const notes = watch("notes") ?? "";
  const copy = TYPE_COPY[requestType];
  const showIrrigation = waterSource === "irrigated" || waterSource === "mixed";

  // Computed on the client only, to avoid a server/client date mismatch.
  useEffect(() => setMinDate(localToday()), []);

  // Follow ?type= changes when the user arrives from another CTA link.
  useEffect(() => setValue("requestType", initialType), [initialType, setValue]);

  // Keep ?type= in the URL in sync so the choice survives refresh / sharing.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("type") !== requestType) {
      url.searchParams.set("type", requestType);
      window.history.replaceState(window.history.state, "", url);
    }
  }, [requestType]);

  // Irrigation type only applies to irrigated / mixed farms.
  useEffect(() => {
    if (!showIrrigation) setValue("irrigationType", "");
  }, [showIrrigation, setValue]);

  // Move focus to the confirmation so screen reader users hear it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypotRef.current?.value ?? "" }),
      });
      const json: { ok?: boolean; error?: string; fieldErrors?: Record<string, string[]> } | null = await res
        .json()
        .catch(() => null);

      if (!res.ok || !json?.ok) {
        // Surface any server-side validation errors inline on their fields.
        if (json?.fieldErrors) {
          for (const [field, messages] of Object.entries(json.fieldErrors)) {
            if (messages?.[0]) setError(field as keyof ContactFormValues, { message: messages[0] });
          }
        }
        throw new Error(json?.error ?? "Something went wrong while sending your request.");
      }
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong while sending your request.");
      setStatus("error");
    }
  };

  const startOver = () => {
    reset(buildDefaults(requestType));
    setStatus("idle");
  };

  /* ------------------------------ Success ------------------------------ */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-lift ring-1 ring-teal-brand-50 sm:p-14"
      >
        <span className="relative flex h-20 w-20 items-center justify-center">
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-green-brand/40" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-brand text-teal-brand-950">
            <CheckCircle2 aria-hidden className="h-10 w-10" />
          </span>
        </span>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-8 font-display text-3xl font-bold tracking-heading text-teal-brand focus:outline-none"
        >
          Thanks, we&apos;ll be in touch within 1–2 business days
        </h2>
        <p className="mt-4 max-w-md leading-relaxed">
          Your {requestType === "farm-demo" ? "farm demo" : "office visit"} request has been received. A member of our
          team will contact you to confirm the details. Need us sooner? Call{" "}
          <a href={SITE.phoneHref} className="font-semibold text-green-brand-700 underline underline-offset-2">
            {SITE.phone}
          </a>
          .
        </p>
        <button type="button" onClick={startOver} className={cn(buttonClasses("outline-dark"), "mt-8")}>
          <RotateCcw aria-hidden className="h-4 w-4" />
          Send another request
        </button>
      </motion.div>
    );
  }

  /* -------------------------------- Form ------------------------------- */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Demo and office visit request"
      className="relative space-y-8 rounded-3xl bg-white p-5 shadow-lift ring-1 ring-teal-brand-50 sm:p-8 lg:p-10"
    >
      {/* Request type toggle */}
      <fieldset>
        <legend className="mb-4 font-display text-sm font-semibold uppercase tracking-eyebrow text-teal-brand-500">
          What would you like to do?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(TYPE_COPY) as RequestType[]).map((type) => {
            const Icon = TYPE_COPY[type].icon;
            return (
              <label
                key={type}
                className={cn(
                  "relative flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-5 transition",
                  "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-green-brand/25",
                  requestType === type
                    ? "border-green-brand bg-green-brand-50"
                    : "border-teal-brand-100 hover:border-teal-brand-200 hover:bg-off-white",
                )}
              >
                <input type="radio" value={type} className="form-check mt-1 rounded-full" {...register("requestType")} />
                <span className="flex-1">
                  <span className="block font-display font-bold text-teal-brand">{TYPE_COPY[type].title}</span>
                  <span className="mt-1 block text-sm">{TYPE_COPY[type].description}</span>
                </span>
                <Icon
                  aria-hidden
                  className={cn("h-6 w-6 shrink-0", requestType === type ? "text-green-brand-700" : "text-teal-brand-300")}
                />
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Section 1 — Contact person */}
      <FormSection step={1} title="Contact person details" description="Who should we speak to about this request?">
        <div>
          <Label htmlFor="fullName" required>
            Full name
          </Label>
          <input
            id="fullName"
            autoComplete="name"
            className="form-input"
            {...describedBy("fullName", { error: errors.fullName?.message })}
            {...register("fullName")}
          />
          <FieldError name="fullName" message={errors.fullName?.message} />
        </div>

        <div>
          <Label htmlFor="jobTitle" optional>
            Job title / role
          </Label>
          <input
            id="jobTitle"
            autoComplete="organization-title"
            placeholder="e.g. Farm Manager"
            className="form-input"
            {...describedBy("jobTitle", { error: errors.jobTitle?.message })}
            {...register("jobTitle")}
          />
          <FieldError name="jobTitle" message={errors.jobTitle?.message} />
        </div>

        <div>
          <Label htmlFor="phone" required>
            Phone number
          </Label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+265 999 123 456"
            className="form-input"
            {...describedBy("phone", { error: errors.phone?.message })}
            {...register("phone")}
          />
          <FieldError name="phone" message={errors.phone?.message} />
        </div>

        <div>
          <Label htmlFor="email" required>
            Email address
          </Label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@farm.mw"
            className="form-input"
            {...describedBy("email", { error: errors.email?.message })}
            {...register("email")}
          />
          <FieldError name="email" message={errors.email?.message} />
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={errors.contactMethod ? errorId("contactMethod") : undefined}>
          <GroupLegend required>Preferred contact method</GroupLegend>
          <div className="grid grid-cols-3 gap-2">
            {CONTACT_METHODS.map((m) => (
              <ChoiceChip key={m} type="radio" value={m} label={CONTACT_METHOD_LABELS[m]} {...register("contactMethod")} />
            ))}
          </div>
          <FieldError name="contactMethod" message={errors.contactMethod?.message} />
        </fieldset>
      </FormSection>

      {/* Section 2 — Farm / organisation */}
      <FormSection step={2} title="Farm / organisation details" description="Helps us bring the right drone and plan the flight.">
        <div>
          <Label htmlFor="orgName" required>
            Farm or organisation name
          </Label>
          <input
            id="orgName"
            autoComplete="organization"
            className="form-input"
            {...describedBy("orgName", { error: errors.orgName?.message })}
            {...register("orgName")}
          />
          <FieldError name="orgName" message={errors.orgName?.message} />
        </div>

        <div>
          <Label htmlFor="district" required>
            District
          </Label>
          <DistrictSelect id="district" {...describedBy("district", { error: errors.district?.message })} {...register("district")} />
          <FieldError name="district" message={errors.district?.message} />
        </div>

        <AreaField
          name="farmSize"
          unitName="farmSizeUnit"
          label="Total farm size"
          register={register}
          error={errors.farmSize?.message}
        />
        <AreaField
          name="cultivatedArea"
          unitName="cultivatedAreaUnit"
          label="Cultivated area under target crop"
          register={register}
          error={errors.cultivatedArea?.message}
        />

        <fieldset className="sm:col-span-2" aria-describedby={errors.crops ? errorId("crops") : undefined}>
          <GroupLegend required>Crop(s) to be considered</GroupLegend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {CROPS.map((crop) => (
              <ChoiceChip key={crop} type="checkbox" value={crop} label={crop} {...register("crops")} />
            ))}
          </div>
          <FieldError name="crops" message={errors.crops?.message} />
        </fieldset>

        <AnimatePresence initial={false}>
          {crops.includes("Other") && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden sm:col-span-2"
            >
              <Label htmlFor="otherCrop" required>
                Other crop(s), please specify
              </Label>
              <input
                id="otherCrop"
                placeholder="e.g. Macadamia, Paprika"
                className="form-input"
                {...describedBy("otherCrop", { error: errors.otherCrop?.message })}
                {...register("otherCrop")}
              />
              <FieldError name="otherCrop" message={errors.otherCrop?.message} />
            </motion.div>
          )}
        </AnimatePresence>

        <fieldset className="sm:col-span-2" aria-describedby={errors.waterSource ? errorId("waterSource") : undefined}>
          <GroupLegend required>Water source</GroupLegend>
          <div className="grid grid-cols-3 gap-2">
            {WATER_SOURCES.map((w) => (
              <ChoiceChip key={w} type="radio" value={w} label={WATER_SOURCE_LABELS[w]} {...register("waterSource")} />
            ))}
          </div>
          <FieldError name="waterSource" message={errors.waterSource?.message} />
        </fieldset>

        <AnimatePresence initial={false}>
          {showIrrigation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Label htmlFor="irrigationType" optional>
                Irrigation type
              </Label>
              <div className="relative">
                <select id="irrigationType" className="form-input appearance-none pr-10" {...register("irrigationType")}>
                  <option value="">Select irrigation type…</option>
                  {IRRIGATION_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-brand-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FormSection>

      {/* Section 3 — Service interest */}
      <FormSection
        step={3}
        title="Service interest"
        description={
          requestType === "farm-demo"
            ? "Tell us what you'd like to see demonstrated on your farm."
            : "Tell us what you'd like to discuss when you visit."
        }
      >
        <fieldset className="sm:col-span-2" aria-describedby={errors.services ? errorId("services") : undefined}>
          <GroupLegend required>Which service(s) are you interested in?</GroupLegend>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <ChoiceChip key={s} type="checkbox" value={s} label={s} {...register("services")} />
            ))}
          </div>
          <FieldError name="services" message={errors.services?.message} />
        </fieldset>

        <div>
          <Label htmlFor="preferredDate" required>
            {copy.dateLabel}
          </Label>
          <input
            id="preferredDate"
            type="date"
            min={minDate}
            className="form-input"
            {...describedBy("preferredDate", { error: errors.preferredDate?.message, hint: copy.dateHint })}
            {...register("preferredDate")}
          />
          <p id="preferredDate-hint" className="form-hint">
            {copy.dateHint}
          </p>
          <FieldError name="preferredDate" message={errors.preferredDate?.message} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="notes" optional>
            Additional notes / specific challenges
          </Label>
          <textarea
            id="notes"
            rows={5}
            maxLength={2000}
            placeholder="e.g. Suspected armyworm in the eastern blocks; field access is via a dirt road after the river crossing."
            className="form-input resize-y"
            {...describedBy("notes", { error: errors.notes?.message })}
            {...register("notes")}
          />
          <p className="form-hint text-right">
            {notes.length} / 2000
          </p>
          <FieldError name="notes" message={errors.notes?.message} />
        </div>
      </FormSection>

      {/* Section 4 — Consent & submit */}
      <FormSection step={4} title="Submit">
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-teal-brand-100 bg-off-white p-4 text-sm has-[:checked]:border-green-brand has-[:checked]:bg-green-brand-50">
            <input
              type="checkbox"
              className="form-check mt-0.5 rounded"
              {...describedBy("consent", { error: errors.consent?.message })}
              {...register("consent")}
            />
            <span className="text-teal-brand-800">
              I consent to Serafin Drones contacting me about this request.
              <span className="ml-0.5 text-green-brand-700" aria-hidden>
                *
              </span>
            </span>
          </label>
          <FieldError name="consent" message={errors.consent?.message} />
        </div>

        {/* Honeypot: hidden from people, often filled in by spam bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" && serverError && (
          <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2">
            <AlertCircle aria-hidden className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">We couldn&apos;t send your request.</p>
              <p className="mt-1">
                {serverError} Please try again, or reach us directly on{" "}
                <a href={SITE.phoneHref} className="font-semibold underline">
                  {SITE.phone}
                </a>
                .
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            <span className="text-green-brand-700" aria-hidden>
              *
            </span>{" "}
            Required field. We&apos;ll never share your details.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={cn(buttonClasses("primary", "lg"), "w-full sm:w-auto")}
          >
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Request
                <Send aria-hidden className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </FormSection>
    </form>
  );
}

/* ---------------------------------------------------------------------- */

type AreaName = "farmSize" | "cultivatedArea";

/** Numeric input with an attached hectares/acres unit select. */
function AreaField({
  name,
  unitName,
  label,
  register,
  error,
}: {
  name: AreaName;
  unitName: "farmSizeUnit" | "cultivatedAreaUnit";
  label: string;
  register: UseFormRegister<ContactFormValues>;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} required>
        {label}
      </Label>
      <div
        className={cn(
          "flex overflow-hidden rounded-xl border bg-white shadow-sm transition focus-within:ring-4",
          error
            ? "border-red-500 focus-within:ring-red-500/15"
            : "border-teal-brand-100 focus-within:border-green-brand focus-within:ring-green-brand/20 hover:border-teal-brand-200",
        )}
      >
        <input
          id={name}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          placeholder="0"
          className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-[15px] text-teal-brand-950 focus:outline-none"
          {...describedBy(name, { error })}
          {...register(name, { valueAsNumber: true })}
        />
        <label htmlFor={unitName} className="sr-only">
          {label} unit
        </label>
        <div className="relative border-l border-teal-brand-100 bg-off-white">
          <select
            id={unitName}
            className="h-full appearance-none bg-transparent py-3 pl-3 pr-8 text-sm font-semibold text-teal-brand-700 focus:outline-none"
            {...register(unitName)}
          >
            {AREA_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-brand-400" />
        </div>
      </div>
      <FieldError name={name} message={error} />
    </div>
  );
}
