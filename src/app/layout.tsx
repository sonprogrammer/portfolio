import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/widgets/navbar/Navbar";
import { QueryProvider } from "@/shared/providers/query-provider";
import { Toaster } from "sonner";
import { SocketProvider } from "@/shared/providers/SocketProvider";

export const metadata: Metadata = {
  title: "손영진 포트폴리오",
  description: "복잡한 데이터 흐름을 구조화하고 사용자 경험으로 연결하는 프론트엔드 개발자, 손영진",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <QueryProvider>

          <header className="sticky top-0 z-10000">
            <Navbar />
          </header>
          <main className="flex-1">
            <SocketProvider>
              {children}
            </SocketProvider>
            <Toaster 
              position='top-center'
              richColors
            />
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
