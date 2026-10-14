import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { cta, hero } from "@/content/landing";
import { Container, OfferCard, RegisterLink } from "./primitives";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--accent)_75%,transparent),transparent_65%)]"
      />
      <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-prose text-lg text-muted-foreground sm:text-xl">
            {hero.subtitle}
          </p>

          <OfferCard className="mt-8" />

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5">
            <RegisterLink />
            <Link
              href="/#como-funciona"
              className="text-center font-medium text-primary underline-offset-4 hover:underline"
            >
              {cta.howItWorks}
            </Link>
          </div>
        </div>

        <HeroPlaceholder />
      </Container>
    </section>
  );
}

/**
 * Placeholder visible y deliberado (DECISIONS C4, copy v6 §2): la imagen y la
 * animación de la tarjeta de sellos se diseñan después.
 */
function HeroPlaceholder() {
  return (
    <div
      role="img"
      aria-label={`Placeholder. ${hero.imagePlaceholder}`}
      className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-input/70 bg-[repeating-linear-gradient(45deg,var(--card)_0_14px,var(--secondary)_14px_28px)] p-6 text-center sm:min-h-[340px] lg:min-h-[420px]"
    >
      <ImageIcon aria-hidden className="size-8 text-muted-foreground" />
      <span className="ph mt-4 text-xs uppercase tracking-widest">placeholder</span>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">{hero.imagePlaceholder}</p>
    </div>
  );
}
