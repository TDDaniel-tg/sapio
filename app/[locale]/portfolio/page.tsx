import { prisma } from "@/lib/prisma"
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid"

interface PortfolioPageProps {
  params: {
    locale: string
  }
  searchParams: {
    category?: string
  }
}

export default async function PortfolioPage({ params, searchParams }: PortfolioPageProps) {
  const where: any = { published: true }

  if (searchParams.category && searchParams.category !== "all") {
    where.category = searchParams.category
  }

  const projects = await prisma.portfolio.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {params.locale === "ru" ? "Наши проекты" : "Our Projects"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {params.locale === "ru"
              ? "Более 50 реализованных проектов для бизнеса"
              : "Over 50 completed projects for businesses"}
          </p>
        </div>

        <PortfolioGrid projects={projects} locale={params.locale} />
      </div>
    </div>
  )
}

