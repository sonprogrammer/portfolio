'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export type PortfolioTabItem = {
  id: string;
  label: string;
  href: string;
};

type PortfolioTabsProps = {
  items: PortfolioTabItem[];
};

export function PortfolioTabs({
  items,
}: PortfolioTabsProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Portfolio navigation"
      className="overflow-x-auto"
    >
      <div className="flex min-w-max items-center gap-1">
        {items.map(item => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                relative px-3 py-3 text-sm transition-colors
                ${
                  isActive
                    ? "font-bold text-zinc-950 dark:text-white"
                    : "font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }
              `}
            >
              {item.label}

              <span
                className={`
                  absolute inset-x-3 bottom-1 h-0.5 bg-zinc-950 transition-transform duration-200
                  dark:bg-white
                  ${isActive ? "scale-x-100" : "scale-x-0"}
                `}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}