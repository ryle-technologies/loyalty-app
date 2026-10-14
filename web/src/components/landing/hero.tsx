import Image from "next/image";
import Link from "next/link";
import { cta, hero } from "@/content/landing";
import { Container, OfferTicket, RegisterLink, StampMark } from "./primitives";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
      {/* Fondo: resplandor crema + trama de puntos (sellos). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_70%_0%,color-mix(in_oklch,var(--crema-strong)_55%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden
        className="stamp-dots pointer-events-none absolute inset-0 -z-10 text-foreground/[0.07] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]"
      />

      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="max-w-[40rem]">
          <h1 className="font-display font-display-hi text-balance text-[2.75rem] font-medium leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {hero.subtitle}
          </p>

          <OfferTicket className="mt-9" />

          <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
            <RegisterLink />
            <Link
              href="/#como-funciona"
              className="text-center font-medium text-foreground underline decoration-foreground/25 underline-offset-[6px] transition-colors hover:decoration-foreground"
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
 * Placeholder visible y deliberado (DECISIONS C4, OPEN-QUESTIONS U9): PNG interino
 * de un iPhone con la tarjeta de sellos de un café ficticio en Apple Wallet.
 * La imagen final y la animación de sellos se diseñan después. El texto largo
 * sigue en `hero.imagePlaceholder`.
 */
function HeroPlaceholder() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-none lg:justify-self-end">
      {/* Fichas decorativas (sellos) flotando alrededor. */}
      <Coin className="-left-3 top-10 sm:-left-8" tilt="-8deg" delay="0s" />
      <Coin className="-right-2 top-1/3 sm:-right-8" tilt="10deg" delay="-2.5s" size="lg" />
      <Coin className="bottom-16 -left-4 sm:-left-10" tilt="6deg" delay="-4.5s" size="sm" />

      <div className="relative mx-auto aspect-[9/17] w-[min(100%,17.5rem)] sm:w-[min(100%,20rem)] lg:w-[21rem]">
        <Image
          src="/hero/hero-phone.png"
          alt="Placeholder: ejemplo de tarjeta de sellos en Apple Wallet de un café ficticio"
          fill
          priority
          sizes="(min-width: 1024px) 21rem, (min-width: 640px) min(100vw, 20rem), min(100vw, 17.5rem)"
          className="object-contain drop-shadow-[0_22px_28px_rgb(62_39_24/0.22)]"
        />
        <span className="ph pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em]">
          placeholder
        </span>
      </div>
    </div>
  );
}

function Coin({
  className,
  tilt,
  delay,
  size = "md",
}: {
  className: string;
  tilt: string;
  delay: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? "size-16" : size === "sm" ? "size-10" : "size-12";
  return (
    <span
      aria-hidden
      className={`absolute z-10 grid ${dim} animate-float place-items-center rounded-full border-4 border-background bg-crema-strong text-espresso-deep shadow-soft ${className}`}
      style={{ "--tilt": tilt, animationDelay: delay } as React.CSSProperties}
    >
      <StampMark className={size === "lg" ? "size-8" : size === "sm" ? "size-5" : "size-6"} />
    </span>
  );
}
