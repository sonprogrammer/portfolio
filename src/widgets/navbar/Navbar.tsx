'use client'

import { PortfolioTabItem, PortfolioTabs } from "@/shared/ui/tabs";
import { useEffect, useState } from "react";

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
  },
  {
    id: "bnty",
    label: "BNTY",
    href: "/bnty",
  },
  {
    id: "vc",
    label: "VC",
    href: "/vc",
  },
  {
    id: "fuelly",
    label: "Fuelly",
    href: "/fuelly",
  },
  {
    id: "mungpass",
    label: "Mungpass",
    href: "/mungpass",
  },
  
  {
    id: "lab",
    label: "Lab",
    href: "/lab",
  },
  {
    id: "more-info",
    label: "More Info",
    href: "/more-info",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
    <div
      className={`
        border-b px-6 transition-all duration-300 sm:px-10
        ${
          scrolled
            ? "border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85"
            : "border-transparent bg-white dark:bg-zinc-950"
        }
      `}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-10 py-4">
        <div className="shrink-0">
          <p className="text-sm font-black tracking-tight text-zinc-950 dark:text-white">
            손영진
          </p>

          <p className="mt-0.5 text-xs font-medium text-zinc-400">
            Frontend Developer
          </p>
        </div>

        <PortfolioTabs items={tabs} />
      </div>
    </div>
  );
}