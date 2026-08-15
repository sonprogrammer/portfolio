'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export type PortfolioTabItem = {
  id: string;
  label: string;
  href: string;
  description?: string
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
      className="w-full lg:overflow-x-auto"
    >
      <div className="flex w-full flex-col gap-1 lg:min-w-max lg:flex-row lg:items-center">
        {items.map(item => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
    relative flex w-full items-center justify-between gap-4 px-3 py-3 text-sm transition-colors
    lg:w-auto lg:block
    ${isActive
                  ? "font-bold text-white"
                  : "font-medium text-zinc-400 hover:text-white"
                }
  `}
            >
              {item.label}
              {item.description && (
                <span className="text-xs font-medium text-zinc-500 lg:hidden">
                  {item.description}
                </span>
              )}

              <span
                className={`
                  absolute inset-x-3 bottom-1 h-0.5 bg-white
                  transition-transform duration-200
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