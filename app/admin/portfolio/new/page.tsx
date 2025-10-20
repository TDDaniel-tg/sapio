"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export default function NewPortfolioPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      titleRu: formData.get("titleRu"),
      titleEn: formData.get("titleEn"),
      descriptionRu: formData.get("descriptionRu"),
      descriptionEn: formData.get("descriptionEn"),
      clientName: formData.get("clientName"),
      location: formData.get("location"),
      category: formData.get("category"),
      coverImage: formData.get("coverImage"),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    }

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast({ title: "Project created successfully!" })
        router.push("/admin/portfolio")
      } else {
        toast({ title: "Error", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title (RU) *</Label>
                <Input name="titleRu" required />
              </div>
              <div className="space-y-2">
                <Label>Title (EN) *</Label>
                <Input name="titleEn" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input name="clientName" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input name="location" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input name="category" placeholder="cafe, office, retail..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Description (RU) *</Label>
                <Textarea name="descriptionRu" rows={4} required />
              </div>
              <div className="space-y-2">
                <Label>Description (EN) *</Label>
                <Textarea name="descriptionEn" rows={4} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cover Image URL</Label>
              <Input name="coverImage" type="url" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch name="published" defaultChecked />
              <Label>Published</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch name="featured" />
              <Label>Featured</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}


