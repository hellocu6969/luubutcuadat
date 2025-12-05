import { Input } from "@/components/ui/input";
import dc from "@/lib/DataConfig";
import { Smile } from "lucide-react";

const AboutMe = ({ data, setData, available }) => {
  if (!available || !data.name) return null;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary/80">
            <Smile className="w-5 h-5" />
            <h3 className="font-serif text-2xl font-bold">{dc.aboutMe.title}</h3>
          </div>
          <p className="text-muted-foreground">{dc.aboutMe.subtitle}</p>
        </div>
        
        <div className="w-full">
          <Input
            className={`h-14 text-lg bg-transparent border-0 border-b-2 border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-zinc-700 ${
              data.about.length < 5 && data.about.length !== 0 ? "border-destructive/50" : ""
            }`}
            placeholder={dc.aboutMe.placeholder}
            value={data.about}
            onChange={(e) => setData({ ...data, about: e.target.value })}
          />
          {data.about.length < 5 && data.about.length !== 0 && (
            <p className="text-sm text-destructive mt-2 animate-in slide-in-from-top-1 fade-in">
              {dc.aboutMe.nameError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

