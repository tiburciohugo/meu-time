"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/app/GlobalRedux/provider";
import Header from "./Components/UI/Header";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en" className="bg-slate-800">
      <body className={inter.className}>
        <Providers>
          {pathname !== "/" && <Header />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
