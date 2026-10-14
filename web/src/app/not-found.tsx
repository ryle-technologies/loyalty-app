import Link from "next/link";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Container, RegisterLink } from "@/components/landing/primitives";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center py-20">
        <Container className="max-w-xl text-center">
          <p className="font-mono text-sm text-muted-foreground">404</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Esta página no existe.</h1>
          <p className="mt-3 text-muted-foreground">
            Volvé al inicio para ver cómo funciona la tarjeta de sellos o anotar tu café.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link href="/" className="font-medium text-primary underline-offset-4 hover:underline">
              Ir al inicio
            </Link>
            <RegisterLink variant="outline" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
