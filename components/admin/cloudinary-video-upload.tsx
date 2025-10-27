"use client"

import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { Upload, X, Video } from "lucide-react"

interface CloudinaryVideoUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
}

export function CloudinaryVideoUpload({ value, onChange, onRemove }: CloudinaryVideoUploadProps) {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      const url = result.info.secure_url
      console.log("Uploaded video URL:", url)
      onChange(url)
    }
  }

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset={uploadPreset}
        options={{
          resourceType: "video",
          sources: ["local", "url"],
          maxFileSize: 100000000, // 100MB
          clientAllowedFormats: ["mp4", "webm", "mov"],
        }}
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <Button type="button" variant="outline" onClick={() => open()}>
            <Video className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
        )}
      </CldUploadWidget>

      {value && (
        <div className="relative w-full max-w-2xl rounded-lg overflow-hidden border">
          <video
            src={value}
            controls
            className="w-full"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}


