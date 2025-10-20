"use client"

import { useState } from "react"
import { Product } from "@prisma/client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Maximize2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images.length > 0 ? product.images : ["/images/placeholder-product.jpg"]
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-square rounded-2xl overflow-hidden bg-muted group cursor-zoom-in"
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={images[selectedImage]}
            alt={product.nameEn}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-muted-foreground"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.nameEn} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl">
          <div className="relative aspect-square w-full">
            <Image
              src={images[selectedImage]}
              alt={product.nameEn}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

