import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import MissionValues from "@/components/home/MissionValues";
import Fleet from "@/components/home/Fleet";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Services />
      <HowItWorks />
      <Benefits />
      <MissionValues />
      <Fleet />
      <Gallery />
      <Testimonials />
      <CTASection />
    </>
  );
}
