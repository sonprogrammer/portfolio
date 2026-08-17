import { themeMap, ThemeType } from "@/shared/config/all/themeMap";

type TechnologyCardProps = {
  title: string;
  description: string;
  items: readonly string[];
  theme: ThemeType
};

export function TechnologyCard({
  title,
  description,
  items,
  theme
}: TechnologyCardProps) {
  const style = themeMap[theme]

  return (
    <article
      className={`
        rounded-3xl border bg-zinc-900/60
        p-5 sm:p-6
        backdrop-blur-md shadow-lg
        transition-all duration-300
        hover:border-zinc-700
        ${style.border}
      `}
    >
      <h3 className="text-base font-extrabold tracking-tight text-white sm:text-lg">
        {title}
      </h3>

      <p className="mt-2 text-sm font-medium leading-6 text-zinc-400">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`
              rounded-full border border-zinc-800/80
              bg-zinc-950/60
              px-3 py-1
              text-xs font-semibold text-zinc-300
              transition-colors
              ${style.hoverText}
            `}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}