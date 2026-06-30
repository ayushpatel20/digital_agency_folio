import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/Services";
import AboutSection from "@/components/sections/About";
import PortfolioSection from "@/components/sections/Portfolio";
import TestimonialsSection from "@/components/sections/Testimonials";
import BlogSection from "@/components/sections/Blog";
import PricingSection from "@/components/sections/Pricing";
import FaqSection from "@/components/sections/Faq";
import ContactSection from "@/components/sections/Contact";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageLoader from "@/components/ui/PageLoader";

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <TestimonialsSection />
        <BlogSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
