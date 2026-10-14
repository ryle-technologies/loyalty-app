"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, CircleAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/config/site";
import { cta, form as copy } from "@/content/landing";
import { DEFAULT_PHONE_PREFIX, isValidPhone } from "@/lib/phone";

type FieldName =
  | "businessName"
  | "contactName"
  | "phone"
  | "barrio"
  | "email"
  | "instagram";

type Values = {
  businessName: string;
  contactName: string;
  phonePrefix: string;
  phoneNational: string;
  barrio: string;
  email: string;
  instagram: string;
  website: string;
};

const EMPTY: Values = {
  businessName: "",
  contactName: "",
  phonePrefix: DEFAULT_PHONE_PREFIX,
  phoneNational: "",
  barrio: "",
  email: "",
  instagram: "",
  website: "",
};

const FIELD_ORDER: FieldName[] = [
  "businessName",
  "contactName",
  "phone",
  "barrio",
  "email",
  "instagram",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INSTAGRAM_RE = /^@?[A-Za-z0-9._]{1,30}$/;

function validateField(name: FieldName, v: Values): string | null {
  switch (name) {
    case "businessName":
      return v.businessName.trim() ? null : copy.fields.businessName.error;
    case "contactName":
      return v.contactName.trim() ? null : copy.fields.contactName.error;
    case "phone":
      return isValidPhone(v.phonePrefix, v.phoneNational) ? null : copy.fields.phone.error;
    case "barrio":
      return v.barrio.trim() ? null : copy.fields.barrio.error;
    case "email":
      return !v.email.trim() || EMAIL_RE.test(v.email.trim()) ? null : copy.fields.email.error;
    case "instagram":
      return !v.instagram.trim() || INSTAGRAM_RE.test(v.instagram.trim())
        ? null
        : copy.fields.instagram.error;
  }
}

function hasValue(name: FieldName, v: Values): boolean {
  if (name === "phone") return v.phoneNational.trim().length > 0;
  return v[name].trim().length > 0;
}

function utmFromLocation() {
  if (typeof window === "undefined") return undefined;
  const p = new URLSearchParams(window.location.search);
  const source = p.get("utm_source") ?? undefined;
  const medium = p.get("utm_medium") ?? undefined;
  const campaign = p.get("utm_campaign") ?? undefined;
  return source || medium || campaign ? { source, medium, campaign } : undefined;
}

export function RegistrationForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (name: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...values, [name]: e.target.value };
    setValues(next);
    const field: FieldName = name === "phonePrefix" || name === "phoneNational" ? "phone" : (name as FieldName);
    if (errors[field] && validateField(field, next) === null) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onBlur = (field: FieldName) => () => {
    if (!hasValue(field, values)) return;
    const err = validateField(field, values);
    setErrors((prev) => ({ ...prev, [field]: err ?? undefined }));
  };

  const focusField = (field: FieldName) => {
    const target = field === "phone" ? "phoneNational" : field;
    document.getElementById(id(target))?.focus();
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);

    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const f of FIELD_ORDER) {
      const err = validateField(f, values);
      if (err) nextErrors[f] = err;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus("submitting");

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          businessName: values.businessName,
          contactName: values.contactName,
          phonePrefix: values.phonePrefix,
          phoneNational: values.phoneNational,
          barrio: values.barrio,
          email: values.email,
          instagram: values.instagram,
          website: values.website,
          utm: utmFromLocation(),
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error?: string; errors?: Record<string, string> }
        | null;

      if (res.ok && data?.ok) {
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      setStatus("idle");
      if (res.status === 400 && data && !data.ok && data.errors) {
        const mapped: Partial<Record<FieldName, string>> = {};
        for (const [k, msg] of Object.entries(data.errors)) {
          if ((FIELD_ORDER as string[]).includes(k)) mapped[k as FieldName] = msg;
        }
        if (Object.keys(mapped).length > 0) {
          setErrors(mapped);
          setShowSummary(true);
          requestAnimationFrame(() => summaryRef.current?.focus());
          return;
        }
      }
      setServerError(
        (data && !data.ok && res.status === 429 && data.error) || copy.networkError,
      );
    } catch {
      setStatus("idle");
      setServerError(copy.networkError);
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-success/25 bg-success-bg p-7 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 aria-hidden className="mt-0.5 size-7 shrink-0 text-success" />
          <div>
            <h3 className="font-display text-2xl font-medium">{copy.success.title}</h3>
            <p className="mt-2 text-foreground/85">{copy.success.text}</p>
          </div>
        </div>
      </div>
    );
  }

  const summaryErrors = FIELD_ORDER.filter((f) => errors[f]);
  const busy = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {showSummary && summaryErrors.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-destructive/30"
        >
          <p className="flex items-center gap-2 font-semibold text-destructive">
            <CircleAlert aria-hidden className="size-4" />
            {copy.summaryTitle}
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {summaryErrors.map((f) => (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => focusField(f)}
                  className="text-left underline underline-offset-2 hover:text-destructive"
                >
                  {errors[f]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Field
        id={id("businessName")}
        label={copy.fields.businessName.label}
        error={errors.businessName}
      >
        <TextInput
          id={id("businessName")}
          name="businessName"
          autoComplete="organization"
          placeholder={copy.fields.businessName.placeholder}
          value={values.businessName}
          onChange={set("businessName")}
          onBlur={onBlur("businessName")}
          error={errors.businessName}
          disabled={busy}
          required
        />
      </Field>

      <Field id={id("contactName")} label={copy.fields.contactName.label} error={errors.contactName}>
        <TextInput
          id={id("contactName")}
          name="contactName"
          autoComplete="name"
          placeholder={copy.fields.contactName.placeholder}
          value={values.contactName}
          onChange={set("contactName")}
          onBlur={onBlur("contactName")}
          error={errors.contactName}
          disabled={busy}
          required
        />
      </Field>

      <Field
        id={id("phoneNational")}
        label={copy.fields.phone.label}
        help={copy.fields.phone.help}
        error={errors.phone}
      >
        <div className="flex gap-2">
          <Input
            id={id("phonePrefix")}
            name="phonePrefix"
            type="tel"
            inputMode="tel"
            aria-label={copy.fields.phone.prefixLabel}
            autoComplete="tel-country-code"
            value={values.phonePrefix}
            onChange={set("phonePrefix")}
            onBlur={onBlur("phone")}
            aria-invalid={errors.phone ? true : undefined}
            disabled={busy}
            className="h-12 w-20 shrink-0 rounded-xl border-input/70 bg-background/60 px-3 text-base hover:border-input focus-visible:bg-card md:text-base"
          />
          <TextInput
            id={id("phoneNational")}
            name="phoneNational"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={copy.fields.phone.placeholder}
            value={values.phoneNational}
            onChange={set("phoneNational")}
            onBlur={onBlur("phone")}
            error={errors.phone}
            describedBy={`${id("phoneNational")}-help`}
            disabled={busy}
            required
          />
        </div>
      </Field>

      <Field id={id("barrio")} label={copy.fields.barrio.label} error={errors.barrio}>
        <TextInput
          id={id("barrio")}
          name="barrio"
          autoComplete="address-level3"
          placeholder={copy.fields.barrio.placeholder}
          value={values.barrio}
          onChange={set("barrio")}
          onBlur={onBlur("barrio")}
          error={errors.barrio}
          disabled={busy}
          required
        />
      </Field>

      <Field id={id("email")} label={copy.fields.email.label} error={errors.email}>
          <TextInput
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder={copy.fields.email.placeholder}
            value={values.email}
            onChange={set("email")}
            onBlur={onBlur("email")}
            error={errors.email}
            disabled={busy}
          />
        </Field>

      <Field id={id("instagram")} label={copy.fields.instagram.label} error={errors.instagram}>
          <TextInput
            id={id("instagram")}
            name="instagram"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder={copy.fields.instagram.placeholder}
            value={values.instagram}
            onChange={set("instagram")}
            onBlur={onBlur("instagram")}
            error={errors.instagram}
            disabled={busy}
          />
        </Field>

      {/* Honeypot: fuera de la vista y del orden de tab. Los bots lo completan. */}
      <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Sitio web</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </div>

      <input type="hidden" name="rubro" value={site.businessType} readOnly />

      <div className="space-y-3 pt-1">
        <Button
          type="submit"
          size="lg"
          disabled={busy}
          aria-busy={busy || undefined}
          className="h-13 w-full rounded-full bg-espresso text-base font-semibold shadow-soft transition-all hover:-translate-y-0.5 hover:bg-espresso-deep hover:shadow-lift"
        >
          {busy ? (
            <>
              <Loader2 aria-hidden className="size-5 animate-spin" />
              {cta.registering}
            </>
          ) : (
            cta.register
          )}
        </Button>

        {serverError ? (
          <p role="alert" className="flex items-start gap-2 text-sm font-medium text-destructive">
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {serverError}
          </p>
        ) : null}

        <p className="text-sm text-muted-foreground">
          {copy.privacyNote}{" "}
          <a
            href={site.legal.privacyUrl}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {copy.privacyLink}
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  help,
  error,
  children,
}: {
  id: string;
  label: string;
  help?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[15px] font-semibold">
        {label}
      </Label>
      {children}
      {help ? (
        <p id={`${id}-help`} className="text-sm text-muted-foreground">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium text-destructive">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TextInput({
  id,
  error,
  describedBy,
  className,
  ...props
}: React.ComponentProps<"input"> & { id: string; error?: string; describedBy?: string }) {
  const described = [describedBy, error ? `${id}-error` : null].filter(Boolean).join(" ");
  return (
    <Input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={described || undefined}
      className={`h-12 rounded-xl border-input/70 bg-background/60 px-3.5 text-base shadow-none transition-colors hover:border-input focus-visible:bg-card md:text-base ${className ?? ""}`}
      {...props}
    />
  );
}
