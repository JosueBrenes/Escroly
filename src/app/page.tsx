import { HeroSection } from "@/modules/landing/ui/hero-section";
import { Footer } from "@/modules/landing/ui/footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-white">
      <HeroSection />
      <Footer />
    </div>
  );
}
