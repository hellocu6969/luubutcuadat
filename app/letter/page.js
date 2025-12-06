"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGuestbook } from "@/components/context/GuestbookContext";
import dc from "@/lib/DataConfig";
import { Letter, Thanks } from "@/components/content";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
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

export default function LetterPage() {
  const router = useRouter();
  const { data, setData, setAvailable } = useGuestbook();

  const handleResetData = () => {
    if (confirm("Xóa toàn bộ dữ liệu và viết lại?")) {
        const initialData = {
            title: "",
            name: "",
            role: "",
            message: "",
        };
        setData(initialData);
        setAvailable(true); // Allow access to write page
        localStorage.removeItem("data");
        toast.success("Đã xóa dữ liệu! Chuyển về trang viết... 📝");
        setTimeout(() => router.push('/write'), 500);
    }
  };
  if (!data || !data.name) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
            <h1 className="text-2xl font-serif mb-4">Chưa có lá thư nào được viết</h1>
            <Button onClick={() => router.push('/')} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay về trang chủ
            </Button>
        </div>
     );
  }

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-500">
        
        {/* Pass props to mimic old behavior: show=false (form hidden), showLetter=true, available=false */}
        <Thanks show={false} available={false} data={data} />

      <div className="container mx-auto px-4 pb-8 max-w-3xl space-y-12">

        <Letter show={false} data={data} showLetter={true} />

        <div className="flex flex-col items-center justify-center pt-8 gap-4">
             <Button onClick={() => router.push('/')} variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay về trang chủ
            </Button>

            {process.env.NODE_ENV === "development" && (
                <div className="flex flex-col items-center gap-3 p-4 border border-dashed border-red-500/30 rounded-lg bg-red-500/5 w-full max-w-xs mt-8">
                    <span className="text-xs font-bold text-red-500/70 uppercase tracking-widest">Dev Zone</span>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                        >
                            <RefreshCcw className="w-3 h-3 mr-2" />
                            Reset & Write New
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Viết lá thư mới?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Dữ liệu của lá thư hiện tại sẽ bị xóa sạch để cậu viết lại từ đầu. Chắc chắn nhé?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Thôi</AlertDialogCancel>
                          <AlertDialogAction onClick={handleResetData} className="bg-red-500 text-white hover:bg-red-600">
                            Ok, viết lại!
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>

        <div className="text-center text-sm text-muted-foreground pt-8 pb-4 opacity-50 hover:opacity-100 transition-opacity">
          <p>© {new Date().getFullYear()} @yunkhngn. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
