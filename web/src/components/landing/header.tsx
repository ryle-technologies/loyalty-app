import Link from "next/link";
import { Brand, Container, StampMark, WhatsappLink } from "./primitives";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/8 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-[72px]">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Inicio">
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-full bg-espresso text-crema-strong shadow-soft"
          >
            <StampMark />
          </span>
          <Brand />
        </Link>
        <WhatsappLink
          size="sm"
          compactOnMobile
          className="h-10 w-10 justify-center rounded-full px-0 text-sm sm:w-auto sm:px-4"
        />
      </Container>
    </header>
  );
}
