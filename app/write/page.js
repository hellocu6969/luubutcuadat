"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGuestbook } from "@/components/context/GuestbookContext";
import RichEditor from "@/components/ui/RichEditor";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Need to make sure I have Avatar component. If not, I'll use a simple div.
import { Button } from "@/components/ui/button";
import { Send, RefreshCcw } from "lucide-react";
import dc from "@/lib/DataConfig";
import Submit from "@/components/content/Submit"; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; 

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

  const handleResetData = () => {
    const initialData = {
        title: "",
        name: "",
        role: "",
        message: "",
    };
    setData(initialData);
    localStorage.removeItem("data");
    toast.success("Đã xóa dữ liệu tạm! 🗑️");
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
                placeholder={dc.writePage.titlePlaceholder}
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
                    placeholder={dc.writePage.namePlaceholder}
                    className="block w-full bg-transparent text-center font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder={dc.writePage.rolePlaceholder}
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
                placeholder={dc.writePage.editorPlaceholder}
            />
        </div>

        {/* Custom Submit Area */}
        <div className="flex justify-center pt-8">
             <SubmitWrapper 
                data={data} 
                setData={setData} 
                setAvailable={setAvailable} 
                available={available} 
                customRender={({ handleSubmit, isSubmitting, testMode, setTestMode }) => (
                    <div className="flex flex-col items-center gap-6">
                        {process.env.NODE_ENV === "development" && (
                            <div className="flex flex-col items-center gap-3 p-4 border border-dashed border-yellow-500/50 rounded-lg bg-yellow-500/5 w-full max-w-xs">
                                <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Dev Tools</span>
                                <label className="flex items-center gap-2 cursor-pointer w-full justify-center">
                                    <input 
                                        type="checkbox" 
                                        checked={testMode} 
                                        onChange={(e) => setTestMode(e.target.checked)}
                                        className="w-4 h-4 accent-yellow-500"
                                    />
                                    <span className="text-sm font-mono text-muted-foreground">Test Mode (No Email)</span>
                                </label>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <RefreshCcw className="w-3 h-3 mr-2" />
                                        Reset Local Data
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Xóa dữ liệu?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Hành động này sẽ xóa toàn bộ nội dung cậu đang viết. Không thể hoàn tác được đâu nha.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                                      <AlertDialogAction onClick={handleResetData} className="bg-red-500 text-white hover:bg-red-600">
                                        Xóa luôn
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                        
                        <Button 
                            onClick={handleSubmit} 
                            disabled={isSubmitting} 
                            size="lg"
                            className="rounded-full px-12 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all active:scale-95"
                        >
                            {isSubmitting ? "Sending..." : "Send to me"}
                            <Send className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                )}
             />
        </div>

      </div>
    </div>
  );
}

import SubmitWrapper from "@/components/content/Submit"; 
