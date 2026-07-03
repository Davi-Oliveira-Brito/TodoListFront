import type { Metadata } from "next";
import { Fustat, Inter_Tight } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const fustat = Fustat({
  variable: "--font-fustat",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TodoList",
  description: "Gerenciador de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fustat.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-body text-slate-900">
        <AuthProvider>
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </AuthProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
