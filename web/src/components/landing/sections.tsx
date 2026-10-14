import { Check, MessageCircle, QrCode, Quote, Repeat, ScanLine, UserPlus, Wallet, X } from "lucide-react";
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
import { Brand, OfferTicket, RegisterLink, Section, SectionTitle, WhatsappLink } from "./primitives";
import { Reveal } from "./reveal";

/* 3 · Cómo te ayuda a crecer */
export function Growth() {
  const icons = [UserPlus, Repeat];
  return (
    <Section id="crecer">
      <Reveal>
        <SectionTitle className="max-w-2xl">{growth.title}</SectionTitle>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
        {growth.columns.map((col, i) => {
          const Icon = icons[i];
          const dark = i === 1;
          return (
            <Reveal key={col.title} delay={i * 120}>
              <article
                className={
                  dark
                    ? "h-full rounded-3xl bg-espresso-deep p-7 text-primary-foreground shadow-lift sm:p-9"
                    : "h-full rounded-3xl border border-foreground/8 bg-crema p-7 sm:p-9"
                }
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`grid size-11 place-items-center rounded-full ${
                      dark ? "bg-crema-strong text-espresso-deep" : "bg-espresso text-crema-strong"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-2xl font-medium">{col.title}</h3>
                </div>
                <ul className="mt-7 space-y-5">
                  {col.items.map((item) => (
                    <li key={item.lead} className="flex gap-3.5">
                      <span
                        aria-hidden
                        className={`mt-[0.6rem] size-2 shrink-0 rounded-full ${
                          dark ? "bg-crema-strong" : "bg-terracotta"
                        }`}
                      />
                      <p className="leading-relaxed">
                        <strong className="font-semibold">{item.lead}</strong>{" "}
                        <span className={dark ? "text-primary-foreground/70" : "text-muted-foreground"}>
                          {item.text}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* 4 · Cómo funciona */
export function HowItWorks() {
  const icons = [QrCode, Wallet, ScanLine];
  return (
    <Section id="como-funciona" tone="muted">
      <Reveal>
        <SectionTitle>{howItWorks.title}</SectionTitle>
      </Reveal>
      <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {/* Línea que une los pasos (solo escritorio). */}
        <div
          aria-hidden
          className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-foreground/15 md:block"
        />
        {howItWorks.steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={step.lead} as="li" delay={i * 120} className="relative">
              <div className="relative z-10 flex size-14 items-center justify-center rounded-full border-4 border-secondary bg-espresso text-crema-strong shadow-soft">
                <Icon aria-hidden className="size-6" />
              </div>
              <p className="font-display mt-6 text-[2.75rem] font-medium leading-none text-foreground/20">
                {i + 1}
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug">
                <span className="sr-only">Paso {i + 1}: </span>
                {step.lead}
              </p>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}

/* 5 · Lo que ganás */
export function Benefits() {
  return (
    <Section id="beneficios">
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-16">
        <div>
          <Reveal>
            <SectionTitle>{benefits.title}</SectionTitle>
          </Reveal>
          <ul className="mt-10 divide-y divide-foreground/8">
            {benefits.items.map((item, i) => (
              <Reveal key={item.lead} as="li" delay={i * 80} className="flex gap-4 py-5 first:pt-0">
                <span
                  aria-hidden
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-crema-strong text-espresso-deep"
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <p className="leading-relaxed">
                  <strong className="font-semibold">{item.lead}</strong>{" "}
                  <span className="text-muted-foreground">{item.text}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* «El cartón»: una nota en papel, un poco torcida. */}
        <Reveal delay={200} className="lg:pt-16">
          <aside className="relative rotate-1 rounded-2xl border border-[oklch(0.78_0.04_75)] bg-[oklch(0.93_0.03_80)] p-7 shadow-soft transition-transform hover:rotate-0 sm:p-8">
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 rounded-sm bg-crema-strong/80 shadow-sm"
            />
            <h3 className="font-display text-xl font-medium text-espresso-deep">
              {benefits.secondary.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {benefits.secondary.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-espresso-deep/80">
                  <X aria-hidden className="mt-1 size-4 shrink-0 text-terracotta" strokeWidth={3} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}

/* 6 · Antes de que lo preguntes */
export function Objections() {
  return (
    <Section id="objeciones" tone="muted">
      <Reveal>
        <SectionTitle>{objections.title}</SectionTitle>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {objections.items.map((item, i) => (
          <Reveal key={item.question} delay={i * 100}>
            <article className="h-full rounded-3xl border border-foreground/8 bg-card p-7 shadow-soft">
              <Quote aria-hidden className="size-6 text-terracotta" fill="currentColor" strokeWidth={0} />
              <p className="font-display mt-4 text-xl font-medium leading-snug">{item.question}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{item.answer}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* 7 · Precio */
export function Pricing() {
  const includes = pricing.includes.replace(/\.$/, "").split(" · ");
  return (
    <Section id="precio">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionTitle className="text-center">{pricing.title}</SectionTitle>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-foreground/8 bg-card shadow-lift">
            <div className="grid sm:grid-cols-[1.25fr_1fr]">
              {pricing.rows.map((row) => {
                const [amount, ...rest] = row.value.split(" ");
                return (
                  <div
                    key={row.label}
                    className={
                      row.highlight
                        ? "bg-espresso-deep p-8 text-primary-foreground sm:p-10"
                        : "p-8 sm:p-10"
                    }
                  >
                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.14em] ${
                        row.highlight ? "text-crema-strong" : "text-muted-foreground"
                      }`}
                    >
                      {row.label}
                    </p>
                    <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                      <span
                        className={`font-display font-display-hi font-medium leading-none ${
                          row.highlight ? "text-[4.5rem] sm:text-[5.5rem]" : "text-5xl"
                        }`}
                      >
                        {amount}
                      </span>
                      <span className={row.highlight ? "text-primary-foreground/75" : "text-muted-foreground"}>
                        {rest.join(" ")}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-foreground/8 p-8 sm:p-10">
              <OfferTicket tone="crema" detail={offer.detail} />

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {pricing.bullets.map((b) => (
                  <li key={b.lead} className="flex gap-3">
                    <Check aria-hidden className="mt-1 size-5 shrink-0 text-success" strokeWidth={2.5} />
                    <p className="leading-relaxed">
                      <strong className="font-semibold">{b.lead}</strong>
                      {b.text ? <span className="text-muted-foreground"> {b.text}</span> : null}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-dashed border-foreground/15 pt-6">
                <p className="text-sm font-semibold">{pricing.includesLead}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {includes.map((inc) => (
                    <li
                      key={inc}
                      className="rounded-full border border-foreground/10 bg-secondary px-3.5 py-1.5 text-sm text-foreground/85"
                    >
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-center">
                <RegisterLink />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* 9 · Bloque WhatsApp */
export function WhatsappBlock() {
  return (
    <Section id="whatsapp" className="pt-0 sm:pt-0">
      <Reveal className="relative z-10 -mt-14 sm:-mt-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-[2rem] border border-foreground/8 bg-card p-7 shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-full bg-[#25D366]/15 text-[#128C7E]"
            >
              <MessageCircle className="size-6" />
            </span>
            <div>
              <SectionTitle as="h2" className="text-2xl sm:text-[1.75rem]">
                {whatsappBlock.title}
              </SectionTitle>
              <p className="mt-1.5 text-muted-foreground">{whatsappBlock.text}</p>
            </div>
          </div>
          <WhatsappLink variant="default" className="shrink-0 bg-espresso hover:bg-espresso-deep" />
        </div>
      </Reveal>
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
        <Reveal>
          <SectionTitle>{faq.title}</SectionTitle>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 divide-y divide-foreground/8 rounded-[2rem] border border-foreground/8 bg-card px-2 shadow-soft sm:px-4">
            {faq.items.map((item) => (
              <details key={item.q} className="group px-4 sm:px-5">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left font-display text-xl font-medium leading-snug marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-foreground/15 text-xl leading-none transition-all group-open:rotate-45 group-open:bg-espresso group-open:text-crema-strong"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-10 leading-relaxed text-muted-foreground">
                  {"privacyLink" in item && item.privacyLink ? (
                    <>
                      {renderWithBrand(item.a)}{" "}
                      <a
                        href={site.legal.privacyUrl}
                        className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                      >
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
        </Reveal>
      </div>
    </Section>
  );
}

function renderWithBrand(text: string) {
  const parts = text.split("{{marca}}");
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <Brand className="text-base font-normal" /> : null}
    </span>
  ));
}

/* 11 · CTA final */
export function FinalCta() {
  return (
    <Section id="cta-final" tone="crema" className="overflow-hidden">
      <div
        aria-hidden
        className="stamp-dots pointer-events-none absolute inset-0 text-espresso/[0.09] [mask-image:radial-gradient(60%_80%_at_50%_50%,#000,transparent)]"
      />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <SectionTitle className="text-[2.4rem] leading-[1.04] sm:text-[3.4rem]">{finalCta.title}</SectionTitle>
        <p className="mt-8 text-balance text-xl font-medium sm:text-2xl">{offer.main}</p>
        <p className="mt-2 text-accent-foreground/70">{offer.short}</p>
        <div className="mt-9 flex flex-col items-center gap-5">
          <RegisterLink />
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-foreground/25 underline-offset-[6px] hover:decoration-foreground"
          >
            {cta.preferWhatsapp}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
