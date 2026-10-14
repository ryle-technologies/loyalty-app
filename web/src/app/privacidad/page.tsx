import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Brand, Container, Placeholder } from "@/components/landing/primitives";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false },
};

/**
 * Borrador provisorio (docs/legal/privacy-policy.md, DECISIONS L1).
 * El texto final lo revisa un abogado antes de publicar (Ley 18.331, Uruguay).
 */
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <Container className="max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            <ArrowLeft aria-hidden className="size-4" />
            Volver
          </Link>

          <div className="mt-6 rounded-xl border border-amber-700/40 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>[PENDIENTE]</strong> Borrador provisorio. El texto legal final tiene que
            revisarlo un abogado (Ley 18.331, Uruguay).
          </div>

          <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
            Política de privacidad de <Brand />
          </h1>

          <section className="prose-neutral mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Qué datos guardamos y para qué</h2>
            <ul className="list-disc space-y-3 pl-5 text-foreground/85">
              <li>
                <strong>Clientes de cada café:</strong> nombre, número de WhatsApp y email. Los
                usamos para darte la tarjeta de sellos de ese café, sumar y canjear tus sellos, y
                recuperar tu tarjeta con un código por email.
              </li>
              <li>
                <strong>Mensajes en el futuro:</strong> solo te escribimos si marcaste esa casilla,
                que es opcional. Por ahora no mandamos mensajes por WhatsApp.
              </li>
              <li>
                <strong>Cafés que se registran en la landing:</strong> nombre del comercio y número
                de contacto, para contactarte y ayudarte a empezar.
              </li>
              <li>
                <strong>Tus sellos:</strong> guardamos los sellos que sumás y las recompensas que
                canjeás en cada café. El personal del café ve tu teléfono enmascarado y no ve tu
                email.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Responsable</h2>
            <p className="text-foreground/85">
              <Brand />. Para consultar, corregir o borrar tus datos, o para dejar de participar,
              escribinos a <Placeholder value={site.legal.contactEmail} />.
            </p>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
