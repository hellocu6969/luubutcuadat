import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import dc from "@/lib/DataConfig";
import { ExternalLink, BookOpen, Github } from "lucide-react";
import React from "react";

const HeadCard = () => {
  const router = useRouter();

  return (
    <div className="headCard-container w-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative w-screen -ml-[50vw] left-[50%] h-[60vh] mb-8 group overflow-hidden">
        <img
          src={dc.headCard.image}
          alt="Letter image"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-10 left-0 right-0 max-w-3xl mx-auto px-4 text-center">
            <p className="text-white/60 font-medium tracking-[0.2em] mb-4 uppercase text-sm">Lưu bút online</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-medium mb-6 leading-tight">
              {dc.headCard.title} {dc.myself}
            </h1>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto space-y-8 px-4 text-center">
        <div className="flex items-center justify-center gap-6">
          <div 
            onClick={() => window.open("https://www.facebook.com/hoang.tiendat2402#", "_blank")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer border-b border-border pb-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="text-sm tracking-wide">Created by @Tiến Đạt</span>
          </div>

          <div 
            onClick={() => window.open("https://www.facebook.com/hoang.tiendat2402#", "_blank")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer border-b border-border pb-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="text-sm tracking-wide">Open Source</span>
          </div>
        </div>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
          <p>{dc.headCard.content}</p>
          <p>{dc.headCard.content2}</p>
        </div>
        
        <div className="flex gap-6 justify-center pt-8">
          <Button 
            onClick={() => router.push('/write')} 
            className="rounded-full px-8 py-6 text-base font-medium transition-all duration-500 hover:scale-105 shadow-lg"
          >
            {dc.headCard.button1}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => router.push('/letter')} 
            className="rounded-full px-8 py-6 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            {dc.headCard.button2}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeadCard;

