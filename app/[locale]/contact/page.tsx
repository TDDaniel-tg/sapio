"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ContactPageProps {
  params: {
    locale: string
  }
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = params
  const isRu = locale === "ru"
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: isRu ? "Заявка отправлена!" : "Request submitted!",
      description: isRu
        ? "Мы свяжемся с вами в ближайшее время"
        : "We'll contact you soon",
    })

    setIsLoading(false)
    e.currentTarget.reset()
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRu ? "Свяжитесь с нами" : "Contact Us"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isRu
              ? "Мы ответим на все ваши вопросы и поможем с заказом"
              : "We'll answer all your questions and help with your order"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
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
                    <Select name="type">
                      <SelectTrigger>
                        <SelectValue
                          placeholder={isRu ? "Выберите тип" : "Select type"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">
                          {isRu ? "Заказ товара" : "Product Order"}
                        </SelectItem>
                        <SelectItem value="consultation">
                          {isRu ? "Консультация" : "Consultation"}
                        </SelectItem>
                        <SelectItem value="custom">
                          {isRu ? "Кастомный проект" : "Custom Project"}
                        </SelectItem>
                        <SelectItem value="design">
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
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contacts */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg mb-4">
                  {isRu ? "Контакты" : "Contacts"}
                </h3>
                
                <a
                  href="tel:+77001234567"
                  className="flex items-start gap-3 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">+7 (700) 123-45-67</div>
                    <div className="text-sm text-muted-foreground">
                      {isRu ? "Звоните" : "Call us"}
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@furniture-studio.com"
                  className="flex items-start gap-3 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">info@furniture-studio.com</div>
                    <div className="text-sm text-muted-foreground">
                      {isRu ? "Напишите нам" : "Email us"}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">
                      {isRu
                        ? "г. Алматы, Казахстан"
                        : "Almaty, Kazakhstan"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isRu ? "Наш адрес" : "Our address"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">
                      {isRu ? "Пн-Пт: 9:00-18:00" : "Mon-Fri: 9:00-18:00"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isRu ? "Сб-Вс: Выходной" : "Sat-Sun: Closed"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">
                  {isRu ? "Соцсети" : "Social Media"}
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Messengers */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-bold text-lg mb-4">
                  {isRu ? "Мессенджеры" : "Messengers"}
                </h3>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <a href="https://wa.me/77001234567" target="_blank" rel="noopener noreferrer">
                    📱 WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <a href="https://t.me/furniturestudio" target="_blank" rel="noopener noreferrer">
                    ✈️ Telegram
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

