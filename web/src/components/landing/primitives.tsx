import Link from "next/link";
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
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
    <div className={cn("mx-auto w-full max-w-[1120px] px-4 sm:px-6", className)}>
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
  tone?: "default" | "muted" | "primary";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-14 sm:py-20",
        tone === "muted" && "bg-secondary/60",
        tone === "primary" && "bg-primary text-primary-foreground",
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
        "text-balance text-2xl font-semibold tracking-tight sm:text-3xl",
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
    <span className={cn("font-semibold tracking-tight", className)}>
      {isPlaceholder ? <span className="ph">{site.brand}</span> : site.brand}
    </span>
  );
}

/** Texto que puede ser placeholder `{{…}}`. */
export function Placeholder({ value }: { value: string }) {
  return /^\{\{.*\}\}$/.test(value) ? <span className="ph">{value}</span> : <>{value}</>;
}

const ctaClass =
  "h-12 w-full rounded-xl px-6 text-base font-semibold sm:w-auto";

export function RegisterLink({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "outline";
}) {
  return (
    <Link
      href="/#registro"
      className={cn(buttonVariants({ variant, size: "lg" }), ctaClass, className)}
    >
      {cta.register}
    </Link>
  );
}

export function WhatsappLink({
  className,
  label = cta.whatsapp,
  variant = "outline",
  size = "lg",
  showIcon = true,
}: {
  className?: string;
  label?: string;
  variant?: "default" | "outline" | "link" | "ghost";
  size?: "lg" | "sm" | "default";
  showIcon?: boolean;
}) {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant, size }),
        size === "lg" && ctaClass,
        className,
      )}
    >
      {showIcon ? <MessageCircle aria-hidden className="size-5" /> : null}
      {label}
    </a>
  );
}

/** Oferta de v6 («Registrate ahora y pagá 199 UYU…»). */
export function OfferCard({
  detail = offer.detail,
  className,
  compact = false,
}: {
  detail?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-accent-foreground/15 bg-accent px-5 py-4 text-accent-foreground",
        className,
      )}
    >
      <p className={cn("font-semibold", compact ? "text-base" : "text-lg sm:text-xl")}>
        {offer.main}
      </p>
      <p className="mt-1 text-sm text-accent-foreground/80">{detail}</p>
    </div>
  );
}
