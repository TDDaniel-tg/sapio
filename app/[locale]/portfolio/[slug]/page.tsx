import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Calendar, MapPin, User, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PortfolioDetailPageProps {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const project = await prisma.portfolio.findUnique({
    where: { slug: params.slug },
  })

  if (!project) return {}

  const title = params.locale === "ru" ? project.titleRu : project.titleEn
  const description = params.locale === "ru" ? project.descriptionRu : project.descriptionEn

  return {
    title: `${title} | Portfolio`,
    description,
  }
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const project = await prisma.portfolio.findUnique({
    where: { slug: params.slug },
  })

  if (!project || !project.published) {
    notFound()
  }

  // Get previous and next projects
  const [prevProject, nextProject] = await Promise.all([
    prisma.portfolio.findFirst({
      where: {
        published: true,
        createdAt: { lt: project.createdAt },
      },
      orderBy: { createdAt: "desc" },
      select: { slug: true, titleRu: true, titleEn: true },
    }),
    prisma.portfolio.findFirst({
      where: {
        published: true,
        createdAt: { gt: project.createdAt },
      },
      orderBy: { createdAt: "asc" },
      select: { slug: true, titleRu: true, titleEn: true },
    }),
  ])

  const title = params.locale === "ru" ? project.titleRu : project.titleEn
  const description = params.locale === "ru" ? project.descriptionRu : project.descriptionEn
  const problem = params.locale === "ru" ? project.problemRu : project.problemEn
  const solution = params.locale === "ru" ? project.solutionRu : project.solutionEn
  const result = params.locale === "ru" ? project.resultRu : project.resultEn
  const coverImage = project.coverImage || project.images[0]

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-16">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.completedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(project.completedAt, params.locale)}</span>
                </div>
              )}
              {project.clientName && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{project.clientName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            </section>

            {/* Problem */}
            {problem && (
              <section>
                <h2 className="text-3xl font-bold mb-4">
                  {params.locale === "ru" ? "Проблема клиента" : "Client's Problem"}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{problem}</p>
              </section>
            )}

            {/* Solution */}
            {solution && (
              <section>
                <h2 className="text-3xl font-bold mb-4">
                  {params.locale === "ru" ? "Решение" : "Solution"}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{solution}</p>
              </section>
            )}

            {/* Gallery */}
            {project.images.length > 1 && (
              <section>
                <h2 className="text-3xl font-bold mb-6">
                  {params.locale === "ru" ? "Фотогалерея" : "Photo Gallery"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image src={image} alt={`${title} ${index + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Result */}
            {result && (
              <section>
                <h2 className="text-3xl font-bold mb-4">
                  {params.locale === "ru" ? "Результат" : "Result"}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{result}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="p-6 bg-muted/30 rounded-lg space-y-4">
              <h3 className="font-bold text-lg">
                {params.locale === "ru" ? "Детали проекта" : "Project Details"}
              </h3>
              <dl className="space-y-3">
                {project.clientName && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">
                      {params.locale === "ru" ? "Клиент" : "Client"}
                    </dt>
                    <dd className="font-medium">{project.clientName}</dd>
                  </div>
                )}
                {project.location && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">
                      {params.locale === "ru" ? "Локация" : "Location"}
                    </dt>
                    <dd className="font-medium">{project.location}</dd>
                  </div>
                )}
                {project.completedAt && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">
                      {params.locale === "ru" ? "Дата завершения" : "Completed"}
                    </dt>
                    <dd className="font-medium">{formatDate(project.completedAt, params.locale)}</dd>
                  </div>
                )}
                {project.category && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">
                      {params.locale === "ru" ? "Категория" : "Category"}
                    </dt>
                    <dd className="font-medium">{project.category}</dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t">
          {prevProject ? (
            <Link href={`/${params.locale}/portfolio/${prevProject.slug}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {params.locale === "ru" ? "Предыдущий" : "Previous"}
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link href={`/${params.locale}/portfolio/${nextProject.slug}`}>
              <Button variant="outline" className="gap-2">
                {params.locale === "ru" ? "Следующий" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}

