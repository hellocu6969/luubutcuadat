import { useRouter } from "next/navigation";
import { React, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dc from "@/lib/DataConfig";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Submit = ({
  setShowLetter,
  onDevelopmentEnv,
  setShow,
  setData,
  data,
  setAvailable,
  available,
  customRender 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const router = useRouter();


  const handleSubmit = () => {
    // Validation logic tailored for the new form
    if (!data.title || data.title.length < 2) {
        toast.error("Vui lòng nhập tiêu đề (ít nhất 2 ký tự)");
        return;
    }
    if (!data.name || data.name.length < 2) {
        toast.error("Vui lòng nhập tên của cậu (ít nhất 2 ký tự)");
        return;
    }
    // Check rich text content length stripping HTML tags approx
    const strippedContent = data.message ? data.message.replace(/<[^>]*>?/gm, '') : "";
    if (strippedContent.length < 10) {
        toast.error("Hãy viết dài hơn một chút nhé (ít nhất 10 ký tự)");
        return;
    }
    
    submitForm();
  };

  const submitForm = async (event) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Đang gửi thư...");
    
    //get date
    const date = new Date();
    const day = date.getDate();
    // Copy logic from before
    const m = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, "0");
    const time = {
      day: day,
      month: m,
      year: year,
      hour: hour,
      minute: minute,
    };

    //set data mới vào data và local storage
    const newData = { ...data, date: time };
    setData(newData);
    if (typeof window !== 'undefined') {
      localStorage.setItem("data", JSON.stringify(newData));
    }

    // SKIP EMAIL IF TEST MODE
    if (!testMode) {
      const emailData = {
        title: data.title || "No Title",
        name: data.name,
        role: data.role || "",
        myself: dc.myself,
        email: dc.email,
        date_day: time.day,
        date_month: time.month,
        date_year: time.year,
        date_hour: time.hour,
        date_minute: time.minute,
        // about_me: data.about, // Deprecated in new design
        // memories: data.memories, // Deprecated
        message: data.message, // Main content
        point: data.handsome,
      };

      try {
        const response = await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });
        
        const result = await response.json();
        
        if (!result.success) {
          console.error("Failed to send email:", result.error);
          toast.error("Gửi thư thất bại. Vui lòng thử lại!", { id: toastId });
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Lỗi kết nối. Kiểm tra mạng nhé!", { id: toastId });
        setIsSubmitting(false);
        return;
      }
    } else {
        console.log("Test Mode: Email sending skipped.");
        // Simulated delay
        await new Promise(r => setTimeout(r, 1000));
    }
    
    toast.success("Đã gửi thư thành công! Cảm ơn cậu", { id: toastId });
    setAvailable(false);
    setIsSubmitting(false);
    //scroll to top, smooth
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // REDIRECT TO LETTER PAGE
    setTimeout(() => {
        router.push("/letter");
    }, 1000); // Wait a bit for toast to show
  };
  
  // Custom Render Logic
  if (customRender) {
      return customRender({ handleSubmit, isSubmitting, testMode, setTestMode });
  }

  if (!available) return null;

  return (
    <div className="w-full pb-20">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/5">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-64 md:h-auto relative group">
             <img 
               src={dc.submit.image} 
               alt="Submit" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-white mb-2">
                <CheckCircle2 className="w-6 h-6" />
                <h3 className="font-serif text-3xl font-bold">{dc.submit.title}</h3>
              </div>
              <p className="text-zinc-400">{dc.submit.subheader}</p>
            </div>
            
            <div className="space-y-4 text-zinc-300 leading-relaxed font-light">
              <p>{dc.submit.content}</p>
              <p>{dc.submit.content2}</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={()=>{window.scrollTo({ top: 750, behavior: "smooth" })}}
                disabled={isSubmitting}
                className="flex-1 border-white/10 hover:bg-white/5 text-zinc-300"
              >
                Xem lại
              </Button>
              <Button 
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="flex-1 bg-white text-black hover:bg-zinc-200"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Đang gửi..." : dc.submit.button}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;



