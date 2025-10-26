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
  const [quantity, setQuantity] = useState(5)
  const [isOrdering, setIsOrdering] = useState(false)

  const name = locale === "ru" ? product.nameRu : product.nameEn
  const shortDesc = locale === "ru" ? product.shortDescRu : product.shortDescEn

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOrdering(true)

    const form = e.currentTarget // Сохраняем ссылку на форму
    const formData = new FormData(form)
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      type: "PRODUCT",
      productId: product.id,
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const responseData = await res.json()

      if (res.ok && responseData.success) {
        toast({
          title: locale === "ru" ? "Заказ отправлен!" : "Order submitted!",
          description: locale === "ru" 
            ? "Мы свяжемся с вами в ближайшее время" 
            : "We'll contact you soon",
        })
        form.reset() // Используем сохраненную ссылку
        setQuantity(5)
      } else {
        throw new Error(responseData.error || "Failed to submit")
      }
    } catch (error) {
      toast({
        title: locale === "ru" ? "Ошибка" : "Error",
        description: locale === "ru"
          ? "Не удалось отправить заказ. Попробуйте позже."
          : "Failed to submit order. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsOrdering(false)
    }
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

      {/* Wholesale Notice */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
          {locale === "ru" ? "⚠️ Только оптовые продажи" : "⚠️ Wholesale only"}
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
          {locale === "ru" ? "Минимальный заказ: 5 единиц" : "Minimum order: 5 units"}
        </p>
      </div>

      {/* Price */}
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          {locale === "ru" ? "Цена за единицу:" : "Price per unit:"}
        </div>
        <div className="text-3xl font-bold text-primary">
          {product.priceOnRequest
            ? locale === "ru" ? "Запросить стоимость" : "Price on Request"
            : formatPrice(product.price || 0, product.currency)}
        </div>
        {!product.priceOnRequest && product.price && (
          <div className="text-sm text-muted-foreground mt-2">
            {locale === "ru" ? "Итого:" : "Total:"} <span className="text-lg font-semibold text-primary">{formatPrice((product.price || 0) * quantity, product.currency)}</span>
          </div>
        )}
      </div>

      {/* Order Form */}
      <form onSubmit={handleOrder} className="space-y-4 p-6 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{locale === "ru" ? "Имя" : "Name"} *</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{locale === "ru" ? "Телефон" : "Phone"} *</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{locale === "ru" ? "Email" : "Email"}</Label>
          <Input id="email" name="email" type="email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            {locale === "ru" ? `Комментарий к заказу (количество: ${quantity} шт)` : `Order comment (quantity: ${quantity} pcs)`}
          </Label>
          <Textarea 
            id="message" 
            name="message"
            rows={3}
            key={quantity}
            defaultValue={`${locale === "ru" ? "Хочу заказать" : "I want to order"} ${quantity} ${locale === "ru" ? "шт" : "pcs"} "${name}"`}
          />
        </div>

        <div className="flex items-center gap-4">
          <Label>{locale === "ru" ? "Количество (мин. 5):" : "Quantity (min. 5):"}</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(5, quantity - 1))}
              disabled={quantity <= 5}
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

        <Button type="submit" size="lg" className="w-full" disabled={isOrdering}>
          {isOrdering 
            ? "..." 
            : locale === "ru" ? "Заказать оптом" : "Order Wholesale"}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          {locale === "ru" 
            ? "Мы свяжемся с вами для обсуждения деталей оптовой поставки" 
            : "We will contact you to discuss wholesale delivery details"}
        </p>
      </form>
    </div>
  )
}

