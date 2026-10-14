import { form } from "@/content/landing";
import { Section, SectionTitle } from "./primitives";
import { RegistrationForm } from "./registration-form";

/* 8 · Formulario de registro de interés (PRD FR-L02) */
export function RegisterSection() {
  return (
    <Section id="registro">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,480px)_1fr] lg:gap-16">
        <div className="relative rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
          <SectionTitle>{form.title}</SectionTitle>
          <p className="mt-2 text-muted-foreground">{form.subtitle}</p>
          <div className="mt-7">
            <RegistrationForm />
          </div>
        </div>

        <aside className="lg:pt-6">
          <h3 className="text-lg font-semibold">{form.next.title}</h3>
          <ol className="mt-5 space-y-5">
            {form.next.steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full border bg-background text-sm font-bold"
                >
                  {i + 1}
                </span>
                <p className="pt-1 text-muted-foreground">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </Section>
  );
}
