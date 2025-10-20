import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { PortfolioEditForm } from "@/components/admin/portfolio-edit-form"

interface EditPortfolioPageProps {
  params: {
    id: string
  }
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const project = await prisma.portfolio.findUnique({
    where: { id: params.id },
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Portfolio Project</h1>
      </div>
      <PortfolioEditForm project={project} />
    </div>
  )
}


