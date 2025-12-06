"use client"

import * as React from "react"

export function useTheme() {
  const [theme, setTheme] = React.useState("light")

  React.useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const savedTheme = localStorage.getItem("theme")
    
    if (savedTheme) {
      setTheme(savedTheme)
      // Class already set by script, but ensure sync
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else if (isDark) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
    
    // Enable transitions after mount to avoid initial flash
    const timer = setTimeout(() => {
        document.body.classList.add("theme-transition")
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return { theme, toggleTheme }
}
