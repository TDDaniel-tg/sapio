import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { WhyUsSection } from "@/components/home/why-us-section";
import { FeaturedProductSection } from "@/components/home/featured-product-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { PortfolioPreview } from "@/components/home/portfolio-preview";
import { ProcessSection } from "@/components/home/process-section";
import { VideoSection } from "@/components/home/video-section";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { ContactSection } from "@/components/home/contact-section";

// Enable dynamic rendering to see updates immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage({ params }: { params: { locale: string } }) {
  // Fetch data from database
  const [featuredProduct, portfolioProjects, testimonials, settings] = await Promise.all([
    prisma.product.findFirst({
      where: { featured: true, published: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.portfolio.findMany({
      where: { published: true, featured: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.testimonial.findMany({
      where: { published: true, featured: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.settings.findUnique({
      where: { id: "singleton" },
    }),
  ]);

  return (
    <>
      <HeroSection 
        videoUrl={settings?.heroVideoUrl}
        titleRu={settings?.heroTitleRu}
        titleEn={settings?.heroTitleEn}
        subtitleRu={settings?.heroSubtitleRu}
        subtitleEn={settings?.heroSubtitleEn}
        locale={params.locale}
      />
      <StatsBar />
      <WhyUsSection />
      {featuredProduct && <FeaturedProductSection product={featuredProduct} />}
      <CategoriesSection />
      <PortfolioPreview projects={portfolioProjects} />
      <ProcessSection />
      <VideoSection />
      <TestimonialsPreview testimonials={testimonials} />
      <ContactSection />
    </>
  );
}

