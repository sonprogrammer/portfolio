'use client'

import { PortfolioTabItem, PortfolioTabs } from "@/shared/ui/tabs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const tabs: PortfolioTabItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/",
  },
  {
    id: "mingle",
    label: "Mingle",
    href: "/mingle",
    description: '팀 프로젝트'
  },
  {
    id: "bnty",
    label: "BNTY",
    href: "/bnty",
    description: '개인 프로젝트'
  },
  {
    id: "vc",
    label: "VC",
    href: "/vc",
    description: '개인 프로젝트'
  },
  {
    id: "fuelly",
    label: "Fuelly",
    href: "/fuelly",
    description: '개인 프로젝트'
  },
  {
    id: "mungpass",
    label: "Mungpass",
    href: "/mungpass",
    description: '개인 프로젝트'
  },
  {
    id: "lab",
    label: "Lab",
    href: "/lab",
    description: '개발 방식 · AI 활용'
  },
  {
    id: "more-info",
    label: "More Info",
    href: "/more-info",
    description: '교육 · 자격 · 자기계발'

  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <div
        className={`
          border-b px-6 transition-all duration-300 sm:px-10
          ${
            scrolled
              ? "backdrop-blur-md border-zinc-800/80 bg-zinc-950/85"
              : "border-transparent bg-zinc-950"
          }
        `}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-10 py-4">
          <Link href="/" className="shrink-0">
            <p className="text-sm font-black tracking-tight text-white">
              손영진
            </p>

            <p className="mt-0.5 text-xs font-medium text-zinc-400">
              Frontend Developer
            </p>
          </Link>


          <div className="hidden lg:block">
            <PortfolioTabs items={tabs} />
          </div>


          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex size-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:text-white lg:hidden cursor-pointer"
            aria-label="메뉴 열기"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>


      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />


      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col justify-between overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
            <div>
              <p className="text-sm font-black tracking-tight text-white">
                손영진
              </p>

              <p className="mt-0.5 text-xs font-medium text-zinc-400">
                Frontend Developer
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex size-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:text-white cursor-pointer"
              aria-label="메뉴 닫기"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="mt-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            <PortfolioTabs items={tabs} />
          </div>
        </div>
      </div>
    </>
  );
}