"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Trash } from "lucide-react"

interface PortfolioDeleteButtonProps {
  projectId: string
}

export function PortfolioDeleteButton({ projectId }: PortfolioDeleteButtonProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/portfolio/${projectId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        toast({ title: "Project deleted successfully!" })
        router.refresh()
      } else {
        toast({ title: "Error", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash className="h-4 w-4" />
    </Button>
  )
}


