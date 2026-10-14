import { site } from "@/config/site";
import { cta, footer } from "@/content/landing";
import { Brand, Container, Placeholder, StampMark } from "./primitives";

export function Footer() {
  const email = site.legal.contactEmail;
  const emailIsPlaceholder = /^\{\{.*\}\}$/.test(email);
  const link = "transition-colors hover:text-foreground hover:underline underline-offset-4";

  return (
    <footer className="border-t border-foreground/8 bg-background py-12 text-sm text-muted-foreground">
      <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 text-foreground">
            <span aria-hidden className="grid size-8 place-items-center rounded-full bg-espresso text-crema-strong">
              <StampMark className="size-4" />
            </span>
            <Brand />
            <span className="text-muted-foreground">© 2026</span>
          </div>

          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Placeholder value={site.legal.legalName} />
            <span aria-hidden>·</span>
            {emailIsPlaceholder ? (
              <Placeholder value={email} />
            ) : (
              <a href={`mailto:${email}`} className={link}>
                {email}
              </a>
            )}
            <span aria-hidden>·</span>
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className={link}>
              {cta.whatsapp}
            </a>
          </p>

          <p>{footer.prices}</p>
          <p className="text-xs text-muted-foreground/80">{footer.trademarks}</p>
        </div>

        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:text-right">
          <a href={site.legal.privacyUrl} className={link}>
            {footer.privacy}
          </a>
          {site.legal.termsUrl ? (
            <a href={site.legal.termsUrl} className={link}>
              {footer.terms}
            </a>
          ) : (
            <span>
              {footer.terms} <span className="ph">{footer.termsPending}</span>
            </span>
          )}
        </nav>
      </Container>
    </footer>
  );
}
