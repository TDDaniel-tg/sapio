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

export default async function HomePage() {
  // Fetch data from database
  const [featuredProduct, portfolioProjects, testimonials] = await Promise.all([
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
  ]);

  return (
    <>
      <HeroSection />
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

