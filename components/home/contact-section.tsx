"use client"

import { useState } from "react"
import { useTranslations } from "@/components/shared/translations-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export function ContactSection() {
  const t = useTranslations("contact")
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
      message: formData.get("message"),
      type: "CONSULTATION",
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
          title: t("form.submit"),
          description: "We'll get back to you soon!",
        })
        form.reset() // Используем сохраненную ссылку
      } else {
        throw new Error(responseData.error || "Failed to submit")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("title")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("form.phone")}</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t("form.message")}</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "..." : t("form.submit")}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

