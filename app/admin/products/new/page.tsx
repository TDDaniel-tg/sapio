"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [mainImage, setMainImage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      nameRu: formData.get("nameRu"),
      nameEn: formData.get("nameEn"),
      descriptionRu: formData.get("descriptionRu"),
      descriptionEn: formData.get("descriptionEn"),
      shortDescRu: formData.get("shortDescRu"),
      shortDescEn: formData.get("shortDescEn"),
      category: formData.get("category"),
      materials: formData.get("materials")?.toString().split(",").map(m => m.trim()) || [],
      dimensions: formData.get("dimensions"),
      weight: formData.get("weight"),
      price: formData.get("price") ? Number(formData.get("price")) : null,
      priceOnRequest: formData.get("priceOnRequest") === "on",
      currency: formData.get("currency") || "USD",
      mainImage: mainImage,
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast({ title: "Product created successfully!" })
        router.push("/admin/products")
      } else {
        toast({ title: "Error", description: "Failed to create product", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name (RU) *</Label>
                <Input name="nameRu" required />
              </div>
              <div className="space-y-2">
                <Label>Name (EN) *</Label>
                <Input name="nameEn" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ROCKING_CHAIRS">Rocking Chairs</SelectItem>
                  <SelectItem value="CHAIRS">Chairs</SelectItem>
                  <SelectItem value="TABLES">Tables</SelectItem>
                  <SelectItem value="SHELVES">Shelves</SelectItem>
                  <SelectItem value="HOME_DECOR">Home Decor</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Short Description (RU)</Label>
                <Input name="shortDescRu" />
              </div>
              <div className="space-y-2">
                <Label>Short Description (EN)</Label>
                <Input name="shortDescEn" />
              </div>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Materials (comma separated)</Label>
              <Input name="materials" placeholder="Oak, Metal, Fabric" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Dimensions</Label>
                <Input name="dimensions" placeholder="120 x 80 x 95 cm" />
              </div>
              <div className="space-y-2">
                <Label>Weight</Label>
                <Input name="weight" placeholder="15 kg" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input name="price" type="number" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select name="currency" defaultValue="USD">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="KZT">KZT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch name="priceOnRequest" />
              <Label>Price on Request</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Main Image</Label>
              <CloudinaryUpload
                value={mainImage}
                onChange={setMainImage}
                onRemove={() => setMainImage("")}
              />
            </div>
            <div className="space-y-2">
              <Label>Or enter URL manually</Label>
              <Input
                type="url"
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
                placeholder="https://..."
              />
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
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}


