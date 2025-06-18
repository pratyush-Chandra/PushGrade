"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ThemeStatusProps {
  showIcon?: boolean
  showLabel?: boolean
  variant?: "default" | "secondary" | "outline" | "destructive"
  className?: string
}

export function ThemeStatus({ 
  showIcon = true, 
  showLabel = true, 
  variant = "outline",
  className = ""
}: ThemeStatusProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Badge variant={variant} className={className}>
        {showIcon && <Sun className="h-3 w-3 mr-1" />}
        {showLabel && "Loading..."}
      </Badge>
    )
  }

  const getThemeIcon = () => {
    const currentTheme = resolvedTheme || theme
    switch (currentTheme) {
      case "light":
        return <Sun className="h-3 w-3" />
      case "dark":
        return <Moon className="h-3 w-3" />
      case "system":
        return <Monitor className="h-3 w-3" />
      default:
        return <Sun className="h-3 w-3" />
    }
  }

  const getThemeLabel = () => {
    const currentTheme = resolvedTheme || theme
    switch (currentTheme) {
      case "light":
        return "Light Mode"
      case "dark":
        return "Dark Mode"
      case "system":
        return "System Theme"
      default:
        return "Light Mode"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Badge variant={variant} className={className}>
        {showIcon && (
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mr-1"
          >
            {getThemeIcon()}
          </motion.div>
        )}
        {showLabel && getThemeLabel()}
      </Badge>
    </motion.div>
  )
} 