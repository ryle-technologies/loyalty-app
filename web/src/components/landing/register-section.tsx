import { form } from "@/content/landing";
import { RegisterLink, Section, SectionTitle } from "./primitives";
import { RegistrationForm } from "./registration-form";
import { Reveal } from "./reveal";

/**
 * «Qué pasa después» (copy v6 §8). `timeline` al lado del formulario;
 * `row` en la landing, debajo del CTA.
 */
function NextSteps({ layout }: { layout: "timeline" | "row" }) {
  return (
    <div>
      <h3
        className={
          layout === "row"
            ? "text-center font-display text-2xl font-medium text-crema-strong sm:text-3xl"
            : "font-display text-2xl font-medium text-crema-strong sm:text-3xl"
        }
      >
        {form.next.title}
      </h3>
      <ol
        className={
          layout === "row"
            ? "mt-8 grid gap-8 text-left sm:grid-cols-3"
            : "relative mt-8 space-y-8 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-primary-foreground/15"
        }
      >
        {form.next.steps.map((step, i) => (
          <li key={step} className="relative flex gap-4 sm:gap-5">
            <span
              aria-hidden
              className="font-display grid size-10 shrink-0 place-items-center rounded-full border border-primary-foreground/20 bg-espresso-deep text-lg font-medium text-crema-strong"
            >
              {i + 1}
            </span>
            <p className="pt-1.5 leading-relaxed text-primary-foreground/85 sm:text-lg">
              <span className="sr-only">Paso {i + 1}: </span>
              {step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DarkBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_100%,color-mix(in_oklch,var(--espresso)_80%,var(--crema-strong)),transparent_70%)]"
    />
  );
}

/* 8 · En la landing: CTA que lleva a la página de registro (/registro). */
export function RegisterSection() {
  return (
    <Section id="registro" tone="dark" className="overflow-hidden pb-28 sm:pb-36">
      <DarkBackdrop />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionTitle>{form.title}</SectionTitle>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/75">
            {form.subtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <RegisterLink variant="light" />
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <NextSteps layout="row" />
        </Reveal>
      </div>
    </Section>
  );
}

/* Página /registro: solo el formulario de registro de interés (PRD FR-L02). */
export function SignupPanel() {
  return (
    <Section tone="dark" className="flex-1 overflow-hidden">
      <DarkBackdrop />
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
          <NextSteps layout="timeline" />
        </Reveal>
      </div>
    </Section>
  );
}
