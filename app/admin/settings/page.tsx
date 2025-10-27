"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudinaryVideoUpload } from "@/components/admin/cloudinary-video-upload"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [heroVideoUrl, setHeroVideoUrl] = useState("")
  const [settings, setSettings] = useState({
    email: "",
    phone: "",
    whatsapp: "",
    telegram: "",
    address: "",
    instagram: "",
    facebook: "",
    youtube: "",
    heroTitleRu: "",
    heroTitleEn: "",
    heroSubtitleRu: "",
    heroSubtitleEn: "",
  })

  useEffect(() => {
    // Load settings from API
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/settings")
        if (res.ok) {
          const data = await res.json()
          setSettings(data)
          setHeroVideoUrl(data.heroVideoUrl || "")
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
      }
    }
    loadSettings()
  }, [])

  const handleSave = async (section: string) => {
    setIsLoading(true)
    try {
      const payload = {
        ...settings,
        heroVideoUrl,
      }
      
      console.log("Saving settings:", payload)
      
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const responseData = await res.json()
      console.log("Save response:", res.status, responseData)

      if (res.ok && !responseData.error) {
        toast({ title: "Settings saved successfully!" })
      } else {
        console.error("Save failed:", responseData)
        toast({ 
          title: "Error", 
          description: responseData.error || "Failed to save settings", 
          variant: "destructive" 
        })
      }
    } catch (error) {
      console.error("Save error:", error)
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Something went wrong", 
        variant: "destructive" 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage site settings</p>
      </div>

      <Tabs defaultValue="contacts" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={settings.email} 
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input 
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input 
                    value={settings.whatsapp || ""}
                    onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telegram</Label>
                  <Input 
                    value={settings.telegram || ""}
                    onChange={(e) => setSettings({...settings, telegram: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input 
                  value={settings.address || ""}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                />
              </div>
              <Button onClick={() => handleSave("contacts")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input 
                  value={settings.instagram || ""}
                  onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Facebook</Label>
                <Input 
                  value={settings.facebook || ""}
                  onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>YouTube</Label>
                <Input 
                  value={settings.youtube || ""}
                  onChange={(e) => setSettings({...settings, youtube: e.target.value})}
                />
              </div>
              <Button onClick={() => handleSave("social")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Hero Video (Cloudinary)</Label>
                <CloudinaryVideoUpload
                  value={heroVideoUrl}
                  onChange={setHeroVideoUrl}
                  onRemove={() => setHeroVideoUrl("")}
                />
              </div>
              <div className="space-y-2">
                <Label>Or enter video URL manually</Label>
                <Input 
                  type="url"
                  value={heroVideoUrl}
                  onChange={(e) => setHeroVideoUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                />
                <p className="text-xs text-muted-foreground">
                  You can upload video to Cloudinary or paste a direct video URL
                </p>
              </div>
              <div className="space-y-2">
                <Label>Title (RU)</Label>
                <Input 
                  value={settings.heroTitleRu || ""}
                  onChange={(e) => setSettings({...settings, heroTitleRu: e.target.value})}
                  placeholder="Надёжная мебель на каждый день"
                />
              </div>
              <div className="space-y-2">
                <Label>Title (EN)</Label>
                <Input 
                  value={settings.heroTitleEn || ""}
                  onChange={(e) => setSettings({...settings, heroTitleEn: e.target.value})}
                  placeholder="Reliable Furniture for Everyday Use"
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle (RU)</Label>
                <Input 
                  value={settings.heroSubtitleRu || ""}
                  onChange={(e) => setSettings({...settings, heroSubtitleRu: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle (EN)</Label>
                <Input 
                  value={settings.heroSubtitleEn || ""}
                  onChange={(e) => setSettings({...settings, heroSubtitleEn: e.target.value})}
                />
              </div>
              <Button onClick={() => handleSave("hero")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


