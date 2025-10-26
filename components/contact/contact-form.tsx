"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"

interface ContactFormProps {
  locale: string
}

export function ContactForm({ locale }: ContactFormProps) {
  const isRu = locale === "ru"
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget // Сохраняем ссылку на форму
    const formData = new FormData(form)
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      company: formData.get("company"),
      type: formData.get("type") || "CONSULTATION",
      message: formData.get("message"),
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
          title: isRu ? "Заявка отправлена!" : "Request submitted!",
          description: isRu
            ? "Мы свяжемся с вами в ближайшее время"
            : "We'll contact you soon",
        })
        form.reset() // Используем сохраненную ссылку
      } else {
        throw new Error(responseData.error || "Failed to submit")
      }
    } catch (error) {
      toast({
        title: isRu ? "Ошибка" : "Error",
        description: isRu
          ? "Не удалось отправить заявку. Попробуйте позже."
          : "Failed to submit request. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {isRu ? "Имя" : "Name"} *
              </Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                {isRu ? "Телефон" : "Phone"} *
              </Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">
              {isRu ? "Компания" : "Company"}
            </Label>
            <Input id="company" name="company" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">
              {isRu ? "Тип запроса" : "Request Type"}
            </Label>
            <Select name="type" defaultValue="CONSULTATION">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRODUCT">
                  {isRu ? "Заказ товара" : "Product Order"}
                </SelectItem>
                <SelectItem value="CONSULTATION">
                  {isRu ? "Консультация" : "Consultation"}
                </SelectItem>
                <SelectItem value="CUSTOM">
                  {isRu ? "Кастомный проект" : "Custom Project"}
                </SelectItem>
                <SelectItem value="DESIGN_ONLY">
                  {isRu ? "Только дизайн" : "Design Only"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {isRu ? "Сообщение" : "Message"} *
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="consent"
              required
              className="rounded border-gray-300"
            />
            <Label htmlFor="consent" className="text-sm cursor-pointer">
              {isRu
                ? "Согласен на обработку персональных данных"
                : "I agree to the processing of personal data"}
            </Label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "..." : isRu ? "Отправить" : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

