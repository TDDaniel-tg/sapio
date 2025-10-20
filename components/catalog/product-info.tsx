"use client"

import { useState } from "react"
import { Product } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatPrice } from "@/lib/utils"
import { Star, Minus, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProductInfoProps {
  product: Product
  locale: string
}

export function ProductInfo({ product, locale }: ProductInfoProps) {
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isOrdering, setIsOrdering] = useState(false)

  const name = locale === "ru" ? product.nameRu : product.nameEn
  const shortDesc = locale === "ru" ? product.shortDescRu : product.shortDescEn

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOrdering(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: locale === "ru" ? "Заказ отправлен!" : "Order submitted!",
      description: locale === "ru" 
        ? "Мы свяжемся с вами в ближайшее время" 
        : "We'll contact you soon",
    })

    setIsOrdering(false)
  }

  return (
    <div className="space-y-6">
      {product.featured && (
        <Badge variant="default">
          {locale === "ru" ? "Популярное" : "Popular"}
        </Badge>
      )}

      <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>

      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          (5.0) • {product.views} {locale === "ru" ? "просмотров" : "views"}
        </span>
      </div>

      {shortDesc && (
        <p className="text-lg text-muted-foreground">{shortDesc}</p>
      )}

      {/* Specifications */}
      <div className="space-y-2 py-4 border-y">
        {product.dimensions && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {locale === "ru" ? "Размеры:" : "Dimensions:"}
            </span>
            <span className="font-medium">{product.dimensions}</span>
          </div>
        )}
        {product.weight && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {locale === "ru" ? "Вес:" : "Weight:"}
            </span>
            <span className="font-medium">{product.weight}</span>
          </div>
        )}
        {product.materials.length > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {locale === "ru" ? "Материалы:" : "Materials:"}
            </span>
            <span className="font-medium">{product.materials.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="text-3xl font-bold text-primary">
        {product.priceOnRequest
          ? locale === "ru" ? "Запросить стоимость" : "Price on Request"
          : formatPrice(product.price || 0, product.currency)}
      </div>

      {/* Order Form */}
      <form onSubmit={handleOrder} className="space-y-4 p-6 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{locale === "ru" ? "Имя" : "Name"} *</Label>
            <Input id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{locale === "ru" ? "Телефон" : "Phone"} *</Label>
            <Input id="phone" type="tel" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{locale === "ru" ? "Email" : "Email"}</Label>
          <Input id="email" type="email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            {locale === "ru" ? "Комментарий к заказу" : "Order comment"}
          </Label>
          <Textarea id="message" rows={3} />
        </div>

        {!product.priceOnRequest && (
          <div className="flex items-center gap-4">
            <Label>{locale === "ru" ? "Количество:" : "Quantity:"}</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isOrdering}>
          {isOrdering 
            ? "..." 
            : locale === "ru" ? "Заказать товар" : "Order Product"}
        </Button>
      </form>
    </div>
  )
}

