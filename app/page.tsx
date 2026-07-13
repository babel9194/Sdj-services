import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PopularServices } from "@/components/sections/PopularServices";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { PaymentMethods } from "@/components/sections/PaymentMethods";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <PopularServices />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <PaymentMethods />
      <CTA />
    </>
  );
}
