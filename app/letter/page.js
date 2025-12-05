"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGuestbook } from "@/components/context/GuestbookContext";
import dc from "@/lib/DataConfig";
import { Letter, Thanks } from "@/components/content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LetterPage() {
  const router = useRouter();
  const { data } = useGuestbook();

  // If no data, maybe redirect home? Or show empty state.
  // For now, let's assume if they land here, they might have data or just exploring.
  // But Letter component crashes if data is missing properties.
  
  if (!data || !data.name) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-4 text-center">
            <h1 className="text-2xl font-serif mb-4">Chưa có lá thư nào được viết</h1>
            <Button onClick={() => router.push('/')} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay về trang chủ
            </Button>
        </div>
     );
  }

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-12">
        
        {/* Pass props to mimic old behavior: show=false (form hidden), showLetter=true, available=false */}
        <Thanks show={false} available={false} data={data} />

        <Letter show={false} data={data} showLetter={true} />

        <div className="flex justify-center pt-8">
             <Button onClick={() => router.push('/')} variant="ghost" className="text-zinc-500 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay về trang chủ
            </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground pt-8 pb-4">
          <p>© {new Date().getFullYear()} {dc.myself}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
