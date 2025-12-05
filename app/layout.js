import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
  title: "Lưu bút - Khoa Nguyễn",
  description: "A digital guestbook by Khoa Nguyễn",
};

import { GuestbookProvider } from "@/components/context/GuestbookContext";
import FloatingNav from "@/components/FloatingNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground selection:bg-white/20", inter.variable, playfair.variable)}>
        <GuestbookProvider>
          {children}
          <FloatingNav />
        </GuestbookProvider>
      </body>
    </html>
  );
}
