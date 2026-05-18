import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MessageSection from "@/components/MessageSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import CtaSection from "@/components/CtaSection";
import NewsSection from "@/components/NewsSection";
import GallerySection from "@/components/GallerySection";
import DownloadsSection from "@/components/DownloadsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <MessageSection />
      <FacilitiesSection />
      <CtaSection />
      <NewsSection />
      <GallerySection />
      <DownloadsSection />
      <ContactSection />
    </main>
  );
}
