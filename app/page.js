"use client";

import HeadCard from "@/components/content/HeadCard";
import dc from "@/lib/DataConfig";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        <HeadCard />
        
        <div className="text-center text-sm text-muted-foreground pt-8 pb-4">
          <p>© {new Date().getFullYear()} {dc.myself}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
