import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MessageSection from "@/components/MessageSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import CtaSection from "@/components/CtaSection";
import NewsSection from "@/components/NewsSection";
import GallerySection from "@/components/GallerySection";
import DownloadsSection from "@/components/DownloadsSection";
import ContactSection from "@/components/ContactSection";
import { hygraphFetch } from "@/lib/hygraph";
import { GET_HOMEPAGE } from "@/lib/queries";

interface HygraphHomePage {
  heroTitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutText: string;
  yearsOfExcellence: number;
  ctaTitle: string;
  ctaDescription: string;
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryImages?: Array<{ url: string }>;
  heroImageLeft?: { url: string };
  heroImageRight?: { url: string };
  aboutImage?: { url: string };
}

export default async function Home() {
  let homePageData: HygraphHomePage | null = null;

  try {
    const res = await hygraphFetch<{ homePages: HygraphHomePage[] }>({
      query: GET_HOMEPAGE,
      revalidate: 3600, // Revalidate at most once per hour (ISR)
    });
    if (res && res.homePages && res.homePages.length > 0) {
      homePageData = res.homePages[0];
    }
  } catch (error) {
    console.warn("Hygraph Fetch HomePage failed, falling back to mock data:", error);
  }

  const heroProps = homePageData ? {
    title: homePageData.heroTitle,
    description: homePageData.heroDescription,
    imageLeft: homePageData.heroImageLeft?.url,
    imageRight: homePageData.heroImageRight?.url,
  } : {};

  const aboutProps = homePageData ? {
    title: homePageData.aboutTitle,
    description: homePageData.aboutText,
    yearsOfExcellence: homePageData.yearsOfExcellence,
    image: homePageData.aboutImage?.url,
  } : {};

  const ctaProps = homePageData ? {
    title: homePageData.ctaTitle,
    description: homePageData.ctaDescription,
  } : {};

  const galleryProps = homePageData ? {
    title: homePageData.galleryTitle,
    subtitle: homePageData.gallerySubtitle,
    images: homePageData.galleryImages?.map((img) => img.url),
  } : {};

  return (
    <main>
      <Hero {...heroProps} />
      <AboutSection {...aboutProps} />
      <MessageSection />
      <FacilitiesSection />
      <CtaSection {...ctaProps} />
      <NewsSection />
      <GallerySection {...galleryProps} />
      <DownloadsSection />
      <ContactSection />
    </main>
  );
}

