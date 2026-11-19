import { Audience } from "@/components/landing/audience";
import { CashSimulator } from "@/components/landing/CashSimulator";
import { Comparison } from "@/components/landing/comparison";
import { Excel } from "@/components/landing/excel";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Invoice } from "@/components/landing/invoice";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";
import { plans } from "@/components/landing/offer";
import { Pricing } from "@/components/landing/pricing";
import { Problem } from "@/components/landing/problem";
import { Security } from "@/components/landing/security";
import { Testimonials } from "@/components/landing/testimonials";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CashKing Tesoreria per PMI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "it-IT",
  offers: { "@type": "Offer", price: plans[0].price, priceCurrency: "EUR", description: "Piano Micro mensile, IVA esclusa" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="contenuto" tabIndex={-1}>
        <Hero />
        <Problem />
        <HowItWorks />
        <CashSimulator />
        <Features />
        <Invoice />
        <Excel />
        <Audience />
        <Comparison />
        <Pricing />
        <Security />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
