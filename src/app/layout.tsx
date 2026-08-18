import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/widgets/navbar/Navbar";
import { QueryProvider } from "@/shared/providers/query-provider";
import { Toaster } from "sonner";
import { SocketProvider } from "@/shared/providers/SocketProvider";
import { VisitorTracker } from "@/shared/ui/visitor-tracking";

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-kohl-xi-20.vercel.app/'),
  title: "손영진 포트폴리오",
  description: '구조적인 설계와 데이터 흐름 최적화로 서비스 성능을 개선하는 프론트엔드 개발자 손영진의 포트폴리오입니다.',
  keywords: [
    '손영진',
    '프론트엔드 개발자',
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    '웹 개발자',
    '포트폴리오',
  ],
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: '손영진 | Frontend Developer',
    description:
    '구조적인 설계와 데이터 흐름 최적화로 서비스 성능을 개선하는 프론트엔드 개발자 손영진의 포트폴리오입니다.',
    url: '/',
    siteName: '손영진 포트폴리오',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/portfolio-main.png',
        width: 1200,
        height: 630,
        alt: '프론트엔드 개발자 손영진 포트폴리오'
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <VisitorTracker />
        <QueryProvider>

          <header className="sticky top-0 z-10000">
            <Navbar />
          </header>
          <main className="flex-1 bg-zinc-950">
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
