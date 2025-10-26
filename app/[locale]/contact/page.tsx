import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/contact-form"
import { prisma } from "@/lib/prisma"

interface ContactPageProps {
  params: {
    locale: string
  }
}

async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: "singleton" },
    })
    return settings
  } catch {
    return null
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = params
  const isRu = locale === "ru"
  const settings = await getSettings()

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
            <ContactForm locale={locale} />
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
                  href={`tel:${settings?.phone || "+77001234567"}`}
                  className="flex items-start gap-3 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{settings?.phone || "+7 (700) 123-45-67"}</div>
                    <div className="text-sm text-muted-foreground">
                      {isRu ? "Звоните" : "Call us"}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${settings?.email || "info@furniture-studio.com"}`}
                  className="flex items-start gap-3 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{settings?.email || "info@furniture-studio.com"}</div>
                    <div className="text-sm text-muted-foreground">
                      {isRu ? "Напишите нам" : "Email us"}
                    </div>
                  </div>
                </a>

                {settings?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{settings.address}</div>
                      <div className="text-sm text-muted-foreground">
                        {isRu ? "Наш адрес" : "Our address"}
                      </div>
                    </div>
                  </div>
                )}

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
                  {settings?.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                  {settings?.facebook && (
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                  )}
                  {settings?.youtube && (
                    <a
                      href={settings.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Youtube className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Messengers */}
            {(settings?.whatsapp || settings?.telegram) && (
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg mb-4">
                    {isRu ? "Мессенджеры" : "Messengers"}
                  </h3>
                  {settings?.whatsapp && (
                    <Button asChild variant="outline" className="w-full justify-start gap-2">
                      <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                        📱 WhatsApp
                      </a>
                    </Button>
                  )}
                  {settings?.telegram && (
                    <Button asChild variant="outline" className="w-full justify-start gap-2">
                      <a href={settings.telegram.startsWith('@') ? `https://t.me/${settings.telegram.slice(1)}` : settings.telegram} target="_blank" rel="noopener noreferrer">
                        ✈️ Telegram
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

