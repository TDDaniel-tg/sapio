import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { PortfolioDeleteButton } from "@/components/admin/portfolio-delete-button"

export default async function AdminPortfolioPage() {
  const projects = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="relative aspect-[4/3] bg-muted">
              {project.coverImage && (
                <Image
                  src={project.coverImage}
                  alt={project.titleEn}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{project.titleEn}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{project.location}</span>
                <span>{project.category}</span>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/admin/portfolio/${project.id}/edit`}>Edit</Link>
                </Button>
                <PortfolioDeleteButton projectId={project.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

