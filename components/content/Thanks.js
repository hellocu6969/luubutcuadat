import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Music } from "lucide-react";
import dc from "@/lib/DataConfig";

const Thanks = ({ show, data, available }) => {
  if (show || available) return null;

  return (
    <div className="thanks-container w-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative w-full h-[60vh] mb-8 group overflow-hidden">
        <img
          src={dc.submit.image}
          alt="Thanks background"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center p-4 text-center">
            <p className="text-white/80 font-medium tracking-[0.2em] mb-4 uppercase text-sm animate-in slide-in-from-bottom-2 duration-1000 delay-300">
                Lưu bút online
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-medium mb-8 leading-tight drop-shadow-lg animate-in slide-in-from-bottom-4 duration-1000 delay-500 max-w-4xl">
              Cảm ơn bạn vì đã viết lưu bút cho mình!
            </h1>
            
            <div className="flex gap-4 animate-in slide-in-from-bottom-6 duration-1000 delay-700">
                <Button 
                    variant="outline" 
                    onClick={() => window.open(dc.submit.returnButtonUrl, "_blank")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {dc.submit.returnButtonText}
                </Button>
                <Button 
                    variant="outline" 
                    onClick={() => window.open(dc.submit.playlistButtonUrl, "_blank")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                    <Music className="w-4 h-4 mr-2" />
                    {dc.submit.playlistButtonText}
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Thanks;

