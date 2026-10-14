import { form } from "@/content/landing";
import { Section, SectionTitle } from "./primitives";
import { RegistrationForm } from "./registration-form";
import { Reveal } from "./reveal";

/* 8 · Formulario de registro de interés (PRD FR-L02) */
export function RegisterSection() {
  return (
    <Section id="registro" tone="dark" className="overflow-hidden pb-28 sm:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_100%,color-mix(in_oklch,var(--espresso)_80%,var(--crema-strong)),transparent_70%)]"
      />
      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,500px)_1fr] lg:items-start lg:gap-20">
        <Reveal>
          <div className="rounded-[2rem] bg-card p-6 text-card-foreground shadow-lift sm:p-9">
            <SectionTitle>{form.title}</SectionTitle>
            <p className="mt-2.5 text-muted-foreground">{form.subtitle}</p>
            <div className="mt-8">
              <RegistrationForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:sticky lg:top-28 lg:pt-4">
          <h3 className="font-display text-2xl font-medium text-crema-strong sm:text-3xl">
            {form.next.title}
          </h3>
          <ol className="relative mt-8 space-y-8 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-primary-foreground/15">
            {form.next.steps.map((step, i) => (
              <li key={step} className="relative flex gap-5">
                <span
                  aria-hidden
                  className="font-display grid size-10 shrink-0 place-items-center rounded-full border border-primary-foreground/20 bg-espresso-deep text-lg font-medium text-crema-strong"
                >
                  {i + 1}
                </span>
                <p className="pt-1.5 text-lg leading-relaxed text-primary-foreground/85">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
