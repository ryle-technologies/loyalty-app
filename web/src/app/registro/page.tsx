import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { SignupPanel } from "@/components/landing/register-section";
import { form } from "@/content/landing";

export const metadata: Metadata = {
  title: form.title,
  description: form.subtitle,
};

/** Página dedicada al registro de interés. El resto de la landing no se repite. */
export default function RegistroPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <SignupPanel />
      </main>
      <Footer />
    </>
  );
}
