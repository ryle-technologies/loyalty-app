import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { RegisterSection } from "@/components/landing/register-section";
import {
  Benefits,
  Faq,
  FinalCta,
  Growth,
  HowItWorks,
  Objections,
  Pricing,
  WhatsappBlock,
} from "@/components/landing/sections";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Growth />
        <HowItWorks />
        <Benefits />
        <Objections />
        <Pricing />
        <RegisterSection />
        <WhatsappBlock />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
