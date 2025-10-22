"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
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
                  <Input defaultValue="info@furniture-studio.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+7 (700) 123-45-67" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input defaultValue="+77001234567" />
                </div>
                <div className="space-y-2">
                  <Label>Telegram</Label>
                  <Input defaultValue="@furniturestudio" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="Almaty, Kazakhstan" />
              </div>
              <Button>Save Changes</Button>
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
                <Input defaultValue="https://instagram.com/furniturestudio" />
              </div>
              <div className="space-y-2">
                <Label>Facebook</Label>
                <Input defaultValue="https://facebook.com/furniturestudio" />
              </div>
              <div className="space-y-2">
                <Label>YouTube</Label>
                <Input defaultValue="https://youtube.com/@furniturestudio" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hero Video URL</Label>
                <Input defaultValue="/videos/hero-video.mp4" />
              </div>
              <div className="space-y-2">
                <Label>Title (RU)</Label>
                <Input defaultValue="Надёжная мебель на каждый день" />
              </div>
              <div className="space-y-2">
                <Label>Title (EN)</Label>
                <Input defaultValue="Reliable Furniture for Everyday Use" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


