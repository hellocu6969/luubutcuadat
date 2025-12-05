import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User } from "lucide-react";
import dc from "@/lib/DataConfig";
import { Input } from "@/components/ui/input";

const NameInput = ({ show, data, setData }) => {
  if (!show) return null;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary/80">
            <User className="w-5 h-5" />
            <h3 className="font-serif text-2xl font-bold">{dc.nameInput.title}</h3>
          </div>
          <p className="text-muted-foreground">{dc.nameInput.subtitle}</p>
        </div>
        
        <div className="w-full">
          <Input
            className={`h-14 text-lg bg-transparent border-0 border-b-2 border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-zinc-700 ${
              data.name.length < 2 && data.name.length !== 0 ? "border-destructive/50" : ""
            }`}
            placeholder={dc.nameInput.placeholder}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {data.name.length < 2 && data.name.length !== 0 && (
            <p className="text-sm text-destructive mt-2 animate-in slide-in-from-top-1 fade-in">
              {dc.nameInput.nameError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameInput;

