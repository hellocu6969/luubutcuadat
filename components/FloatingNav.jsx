"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Home, PenTool, Sun, Moon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col gap-2 p-2 bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
                <NavButton
                    active={pathname === "/"}
                    onClick={() => router.push("/")}
                    icon={<Home className="w-5 h-5" />}
                    label="Home"
                />
                <NavButton
                    active={pathname === "/write"}
                    onClick={() => router.push("/write")}
                    icon={<PenTool className="w-5 h-5" />}
                    label="Write"
                />
                <NavButton
                    active={pathname === "/letter"}
                    onClick={() => router.push("/letter")}
                    icon={<Mail className="w-5 h-5" />}
                    label="Letter"
                />

                <div className="h-px w-8 bg-white/10 mx-auto my-1" />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full w-10 h-10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                    {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </div>
    );
};

const NavButton = ({ active, onClick, icon, label }) => (
    <Button
        variant={active ? "secondary" : "ghost"}
        size="icon"
        onClick={onClick}
        className={cn(
            "rounded-full w-10 h-10 transition-colors",
            active
                ? "bg-white text-black hover:bg-zinc-200"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
        )}
        title={label}
    >
        {icon}
    </Button>
);

export default FloatingNav;
