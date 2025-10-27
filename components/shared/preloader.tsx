"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 150)

    // Wait for images to load
    if (typeof window !== "undefined") {
      const handleLoad = () => {
        // Small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }

      if (document.readyState === "complete") {
        handleLoad()
      } else {
        window.addEventListener("load", handleLoad)
        return () => window.removeEventListener("load", handleLoad)
      }
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="text-center space-y-6">
            {/* Logo or Brand Name */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-primary">
                Sapio
              </h1>
              <p className="text-muted-foreground mt-2">Мебельная студия</p>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-primary"
              />
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              Загрузка... {progress}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


