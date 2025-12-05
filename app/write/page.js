"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGuestbook } from "@/components/context/GuestbookContext";
import RichEditor from "@/components/ui/RichEditor";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Need to make sure I have Avatar component. If not, I'll use a simple div.
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import dc from "@/lib/DataConfig";
import Submit from "@/components/content/Submit"; // We might reuse logic or inline it. Let's use the Submit component but we need to style it or pass a custom trigger? 
// Actually, Submit.js has its own UI. I should probably refactor Submit.js to be a logic hook or just a button.
// For now, I will use Submit component but mostly hide its UI and just use its logic? No, Submit.js is a Card. 
// I should probably manually implement the submit logic here or refactor Submit.js.
// Given the time, I'll implement the submit logic locally here or simpler: Update Submit.js to be invisible/customizable?
// Better: JUST USE THE LOGIC in Submit.js. 
// Actually, let's just rewrite the submit logic here to be clean for this page.

export default function WritePage() {
  const router = useRouter();
  const { data, setData, available, setAvailable } = useGuestbook();

  // If already submitted (available == false), redirect to letter
  useEffect(() => {
    if (!available) {
      router.push("/letter");
    }
  }, [available, router]);

  if (!available) return null;

  const handleContentChange = (html) => {
    setData({ ...data, message: html });
  };

  // Get current date formatted
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-500 pb-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
        
        {/* Date Header */}
        <div className="text-center">
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-medium">{today}</p>
        </div>

        {/* Title Input */}
        <div className="text-center">
            <input
                type="text"
                placeholder="Blog Title"
                className="w-full bg-transparent text-5xl md:text-7xl font-serif font-bold text-center placeholder:text-muted-foreground/50 focus:outline-none focus:placeholder:text-muted-foreground/30"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
            />
        </div>

        {/* Author Section */}
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted overflow-hidden ring-2 ring-border relative group">
                 {/* Placeholder Avatar */}
                 <img src="https://github.com/shadcn.png" alt="Avatar" className="w-full h-full object-cover opacity-80" />
            </div>
            
            <div className="text-center space-y-1">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="block w-full bg-transparent text-center font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Role (e.g. Developer)"
                    className="block w-full bg-transparent text-center text-sm text-muted-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                />
            </div>
        </div>

        {/* Main Content Editor */}
        <div className="pt-8">
            <RichEditor 
                content={data.message} 
                onChange={handleContentChange}
                placeholder="Start writing your thoughts..."
            />
        </div>

        {/* Custom Submit Area */}
        <div className="flex justify-center pt-8">
             <SubmitWrapper 
                data={data} 
                setData={setData} 
                setAvailable={setAvailable} 
                available={available} 
                customRender={({ handleSubmit, isSubmitting }) => (
                    <Button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting} 
                        size="lg"
                        className="rounded-full px-12 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                        {isSubmitting ? "Publishing..." : "Publish Post"}
                        <Send className="ml-2 w-5 h-5" />
                    </Button>
                )}
             />
        </div>

      </div>
    </div>
  );
}

import SubmitWrapper from "@/components/content/Submit"; 
