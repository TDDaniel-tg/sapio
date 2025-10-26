"use client"

import { CldImage } from "next-cloudinary"
import Image from "next/image"

interface CloudinaryImageProps {
  src: string
  alt: string
  width: number
  height: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
}

/**
 * Универсальный компонент для изображений
 * Автоматически использует Cloudinary для оптимизации если URL от Cloudinary
 * Иначе использует стандартный Next.js Image
 */
export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  quality = 85,
  sizes,
}: CloudinaryImageProps) {
  // Проверяем является ли это Cloudinary URL
  const isCloudinary = src.includes("cloudinary.com") || src.includes("res.cloudinary")

  if (isCloudinary) {
    // Извлекаем publicId из Cloudinary URL
    const getPublicId = (url: string) => {
      // Пример: https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg
      // Извлекаем publicId после /upload/
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/)
      return match ? match[1] : url
    }

    const publicId = getPublicId(src)

    if (fill) {
      return (
        <CldImage
          src={publicId}
          alt={alt}
          fill
          className={className}
          priority={priority}
          quality={quality}
          sizes={sizes}
        />
      )
    }

    return (
      <CldImage
        src={publicId}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
      />
    )
  }

  // Используем стандартный Next.js Image для локальных изображений
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
    />
  )
}

