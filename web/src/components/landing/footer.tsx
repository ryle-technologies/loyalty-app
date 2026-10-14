import { site } from "@/config/site";
import { cta, footer } from "@/content/landing";
import { Brand, Container, Placeholder } from "./primitives";

export function Footer() {
  const email = site.legal.contactEmail;
  const emailIsPlaceholder = /^\{\{.*\}\}$/.test(email);

  return (
    <footer className="border-t bg-background py-10 text-sm text-muted-foreground">
      <Container className="space-y-4">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Brand className="text-foreground" />
          <span>© 2026</span>
          <span aria-hidden>·</span>
          <Placeholder value={site.legal.legalName} />
          <span aria-hidden>·</span>
          {emailIsPlaceholder ? (
            <Placeholder value={email} />
          ) : (
            <a href={`mailto:${email}`} className="hover:text-foreground hover:underline">
              {email}
            </a>
          )}
          <span aria-hidden>·</span>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground hover:underline"
          >
            {cta.whatsapp}
          </a>
        </p>

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <a href={site.legal.privacyUrl} className="hover:text-foreground hover:underline">
            {footer.privacy}
          </a>
          <span aria-hidden>·</span>
          {site.legal.termsUrl ? (
            <a href={site.legal.termsUrl} className="hover:text-foreground hover:underline">
              {footer.terms}
            </a>
          ) : (
            <span>
              {footer.terms} <span className="ph">{footer.termsPending}</span>
            </span>
          )}
        </p>

        <p>{footer.prices}</p>
        <p className="text-xs">{footer.trademarks}</p>
      </Container>
    </footer>
  );
}
