import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
  title: "Lưu bút - Khoa Nguyễn",
  description: "A digital guestbook by Khoa Nguyễn",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-icon.png",
  },
  manifest: "/favicon/manifest.json",
};

import { GuestbookProvider } from "@/components/context/GuestbookContext";
import FloatingNav from "@/components/FloatingNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var localTheme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (localTheme === 'dark' || (!localTheme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary-foreground", inter.variable, playfair.variable)}>
        <GuestbookProvider>
          {children}
          <FloatingNav />
        </GuestbookProvider>
      </body>
    </html>
  );
}
