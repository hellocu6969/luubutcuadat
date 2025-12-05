import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import dc from "@/lib/DataConfig";
import { Star } from "lucide-react";

const MultipleChoice = ({ setData, data, available }) => {
  if (!available || !data.name) return null;

  const marks = [
    { value: 0, label: dc.handsome.label.one },
    { value: 40, label: dc.handsome.label.fouth },
    { value: 70, label: dc.handsome.label.sixth },
    { value: 100, label: dc.handsome.label.full },
  ];

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
      <div className="space-y-8 py-4">
        <div className="space-y-2 text-center">
           <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 mb-4">
              <Star className="w-6 h-6 text-white" />
           </div>
          <h3 className="font-serif text-3xl font-medium text-white">{dc.handsome.title}</h3>
          <p className="text-zinc-400 max-w-md mx-auto">{dc.handsome.subtitle}</p>
        </div>

        <div className="px-4 py-8 bg-white/5 rounded-2xl border border-white/5">
          <Slider
            defaultValue={[40]}
            max={100}
            step={20}
            onValueChange={(val) => setData({ ...data, handsome: val[0] })}
            className="py-4"
          />
          <div className="flex justify-between mt-6 text-sm text-zinc-500 font-medium tracking-wide uppercase">
            <span>{dc.handsome.label.one}</span>
            <span>{dc.handsome.label.full}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;

