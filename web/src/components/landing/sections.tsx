import { Check, X } from "lucide-react";
import { site } from "@/config/site";
import {
  benefits,
  cta,
  faq,
  finalCta,
  growth,
  howItWorks,
  objections,
  offer,
  pricing,
  whatsappBlock,
} from "@/content/landing";
import {
  Brand,
  OfferCard,
  RegisterLink,
  Section,
  SectionTitle,
  WhatsappLink,
} from "./primitives";

/* 3 · Cómo te ayuda a crecer */
export function Growth() {
  return (
    <Section id="crecer" tone="muted">
      <SectionTitle>{growth.title}</SectionTitle>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {growth.columns.map((col) => (
          <div key={col.title} className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-4">
              {col.items.map((item) => (
                <li key={item.lead}>
                  <p>
                    <strong className="font-semibold">{item.lead}</strong>{" "}
                    <span className="text-muted-foreground">{item.text}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* 4 · Cómo funciona */
export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <SectionTitle>{howItWorks.title}</SectionTitle>
      <ol className="mt-8 grid gap-5 md:grid-cols-3">
        {howItWorks.steps.map((step, i) => (
          <li key={step.lead} className="relative rounded-2xl border bg-card p-6 pt-7 shadow-sm">
            <span
              aria-hidden
              className="absolute -top-4 left-6 grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
            >
              {i + 1}
            </span>
            <p className="font-semibold">
              <span className="sr-only">Paso {i + 1}: </span>
              {step.lead}
            </p>
            <p className="mt-2 text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* 5 · Lo que ganás */
export function Benefits() {
  return (
    <Section id="beneficios" tone="muted">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <SectionTitle>{benefits.title}</SectionTitle>
          <ul className="mt-8 space-y-5">
            {benefits.items.map((item) => (
              <li key={item.lead} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-success-bg text-success"
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <p>
                  <strong className="font-semibold">{item.lead}</strong>{" "}
                  <span className="text-muted-foreground">{item.text}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="self-start rounded-2xl border bg-card p-6 text-sm shadow-sm">
          <h3 className="text-base font-semibold">{benefits.secondary.title}</h3>
          <ul className="mt-3 space-y-2.5 text-muted-foreground">
            {benefits.secondary.items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <X aria-hidden className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}

/* 6 · Antes de que lo preguntes */
export function Objections() {
  return (
    <Section id="objeciones">
      <SectionTitle>{objections.title}</SectionTitle>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {objections.items.map((item) => (
          <div key={item.question} className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="font-semibold">{item.question}</p>
            <p className="mt-3 text-muted-foreground">{item.answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* 7 · Precio */
export function Pricing() {
  return (
    <Section id="precio" tone="muted">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>{pricing.title}</SectionTitle>
        <OfferCard className="mt-6" detail={offer.detail} />

        <dl className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
          {pricing.rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-4 px-5 py-4 ${i > 0 ? "border-t" : ""}`}
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className={row.highlight ? "text-lg font-semibold" : "font-medium"}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 space-y-3">
          {pricing.bullets.map((b) => (
            <li key={b.lead} className="flex gap-3">
              <Check aria-hidden className="mt-1 size-5 shrink-0 text-success" strokeWidth={2.5} />
              <p>
                <strong className="font-semibold">{b.lead}</strong>
                {b.text ? <span className="text-muted-foreground"> {b.text}</span> : null}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted-foreground">
          <strong className="font-semibold text-foreground">{pricing.includesLead}</strong>{" "}
          {pricing.includes}
        </p>

        <div className="mt-8">
          <RegisterLink />
        </div>
      </div>
    </Section>
  );
}

/* 9 · Bloque WhatsApp */
export function WhatsappBlock() {
  return (
    <Section id="whatsapp">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 rounded-3xl border bg-card p-7 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-9">
        <div>
          <SectionTitle as="h2" className="text-xl sm:text-2xl">
            {whatsappBlock.title}
          </SectionTitle>
          <p className="mt-2 text-muted-foreground">{whatsappBlock.text}</p>
        </div>
        <WhatsappLink variant="default" className="shrink-0" />
      </div>
      {site.whatsapp.isPlaceholder ? (
        <p className="mx-auto mt-4 max-w-3xl text-sm">
          <span className="ph">NÚMERO A DEFINIR (OQ-4)</span>{" "}
          <span className="text-muted-foreground">
            El link apunta a <code className="font-mono">wa.me/{site.whatsapp.number}</code>. Bloquea publicar.
          </span>
        </p>
      ) : null}
    </Section>
  );
}

/* 10 · Preguntas frecuentes */
export function Faq() {
  return (
    <Section id="preguntas" tone="muted">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>{faq.title}</SectionTitle>
        <div className="mt-8 divide-y rounded-2xl border bg-card shadow-sm">
          {faq.items.map((item) => (
            <details key={item.q} className="group px-5 py-1 open:bg-secondary/40">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full border text-lg leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-muted-foreground">
                {"privacyLink" in item && item.privacyLink ? (
                  <>
                    {renderWithBrand(item.a)}{" "}
                    <a href={site.legal.privacyUrl} className="font-medium text-primary underline-offset-4 hover:underline">
                      Política de privacidad
                    </a>
                  </>
                ) : (
                  item.a
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function renderWithBrand(text: string) {
  const parts = text.split("{{marca}}");
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <Brand className="font-normal" /> : null}
    </span>
  ));
}

/* 11 · CTA final */
export function FinalCta() {
  return (
    <Section id="cta-final" tone="primary">
      <div className="mx-auto max-w-3xl text-center">
        <SectionTitle className="text-3xl sm:text-4xl">{finalCta.title}</SectionTitle>
        <p className="mt-6 text-lg font-semibold sm:text-xl">{offer.main}</p>
        <p className="mt-1 text-primary-foreground/75">{offer.short}</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <RegisterLink
            variant="outline"
            className="border-primary-foreground/30 bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary"
          />
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline-offset-4 hover:underline"
          >
            {cta.preferWhatsapp}
          </a>
        </div>
      </div>
    </Section>
  );
}
