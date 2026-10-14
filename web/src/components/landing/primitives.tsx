import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { cta, offer } from "@/content/landing";

/** Ancho máximo de S1 según DESIGN §4 (1120 px). */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1120px] px-5 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
  tone = "default",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "default" | "muted" | "dark" | "crema";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 py-16 sm:py-24",
        tone === "muted" && "bg-secondary/55",
        tone === "dark" && "bg-espresso-deep text-primary-foreground",
        tone === "crema" && "bg-crema",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display font-display-hi text-balance text-[2rem] font-medium leading-[1.08] sm:text-[2.6rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Marca del producto. Mientras sea `{{marca}}`, se ve como placeholder. */
export function Brand({ className }: { className?: string }) {
  const isPlaceholder = /^\{\{.*\}\}$/.test(site.brand);
  return (
    <span className={cn("font-display text-xl font-semibold tracking-tight", className)}>
      {isPlaceholder ? <span className="ph font-sans text-base">{site.brand}</span> : site.brand}
    </span>
  );
}

/** Texto que puede ser placeholder `{{…}}`. */
export function Placeholder({ value }: { value: string }) {
  return /^\{\{.*\}\}$/.test(value) ? <span className="ph">{value}</span> : <>{value}</>;
}

const ctaClass =
  "h-13 w-full rounded-full px-7 text-base font-semibold shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:w-auto";

export function RegisterLink({
  className,
  variant = "default",
  withArrow = true,
}: {
  className?: string;
  variant?: "default" | "outline" | "light";
  withArrow?: boolean;
}) {
  return (
    <Link
      href="/registro"
      className={cn(
        buttonVariants({ variant: variant === "light" ? "default" : variant, size: "lg" }),
        ctaClass,
        variant === "default" && "bg-espresso hover:bg-espresso-deep",
        variant === "light" &&
          "bg-crema-strong text-espresso-deep hover:bg-crema-strong/90 hover:text-espresso-deep",
        "group",
        className,
      )}
    >
      {cta.register}
      {withArrow ? (
        <ArrowRight
          aria-hidden
          className="size-5 transition-transform group-hover:translate-x-0.5"
        />
      ) : null}
    </Link>
  );
}

export function WhatsappLink({
  className,
  label = cta.whatsapp,
  variant = "outline",
  size = "lg",
  showIcon = true,
  compactOnMobile = false,
}: {
  className?: string;
  label?: string;
  variant?: "default" | "outline" | "link" | "ghost";
  size?: "lg" | "sm" | "default";
  showIcon?: boolean;
  /** En pantallas chicas muestra solo el ícono (el nombre accesible sigue siendo el texto). */
  compactOnMobile?: boolean;
}) {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={compactOnMobile ? label : undefined}
      className={cn(
        buttonVariants({ variant, size }),
        size === "lg" && ctaClass,
        variant === "outline" && "border-foreground/15 bg-card/70 backdrop-blur hover:bg-card",
        className,
      )}
    >
      {showIcon ? <MessageCircle aria-hidden className="size-5" /> : null}
      <span className={compactOnMobile ? "hidden sm:inline" : undefined}>{label}</span>
    </a>
  );
}

/**
 * Oferta de v6 como «ticket» de café: muescas laterales y línea troquelada.
 */
export function OfferTicket({
  detail = offer.detail,
  className,
  tone = "crema",
}: {
  detail?: string;
  className?: string;
  tone?: "crema" | "paper";
}) {
  return (
    <div
      className={cn(
        "ticket px-7 py-5 sm:px-9 sm:py-6",
        tone === "crema" && "bg-crema text-accent-foreground",
        tone === "paper" && "bg-card text-foreground shadow-soft",
        className,
      )}
    >
      <p className="font-display text-balance text-xl font-medium leading-snug sm:text-2xl">
        {offer.main}
      </p>
      <div className="ticket-rule my-4 text-current" aria-hidden />
      <p className="text-sm font-medium opacity-75 sm:text-[15px]">{detail}</p>
    </div>
  );
}

/** Marca provisoria: un sello. Se reemplaza cuando exista identidad (OQ-S13). */
export function StampMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.3 12.2 2.6 2.6 4.8-5.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
