"use client"

import { useTheme } from "@/hooks/useTheme"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function Header() {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">
                        Lưu Bút
                    </span>
                </div>
            </div>
        </header>
    )
}
