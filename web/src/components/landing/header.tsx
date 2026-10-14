import { Brand, Container, WhatsappLink } from "./primitives";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <Container className="flex h-16 items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-2.5 text-lg" aria-label="Inicio">
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"
          >
            <StampMark />
          </span>
          <Brand />
        </a>
        <WhatsappLink size="sm" className="h-10 rounded-lg px-3 text-sm sm:px-4" />
      </Container>
    </header>
  );
}

/** Marca provisoria: un sello. Se reemplaza cuando exista identidad (OQ-S13). */
function StampMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
