import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Câmara LP3",
  description: "Câmara de Deputados LP3",
  referrer: "no-referrer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100">
        <div className="h-screen flex flex-col">
          <div className="flex flex-1">
            <Sidebar />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
