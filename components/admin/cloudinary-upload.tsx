"use client"

import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface CloudinaryUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
}

export function CloudinaryUpload({ value, onChange, onRemove }: CloudinaryUploadProps) {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      const url = result.info.secure_url
      console.log("Uploaded image URL:", url)
      onChange(url)
    }
  }

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset={uploadPreset}
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <Button type="button" variant="outline" onClick={() => open()}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        )}
      </CldUploadWidget>

      {value && (
        <div className="relative w-full aspect-square max-w-sm rounded-lg overflow-hidden border">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
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

