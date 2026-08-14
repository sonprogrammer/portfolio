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
      className={`rounded-[2.5rem] border bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700 ${style.border}`}
    >
      <h3 className="text-lg font-extrabold text-white tracking-tight">
        {title}
      </h3>

      <p className="mt-3 min-h-12 text-sm font-medium leading-7 text-zinc-300">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-md transition-colors ${style.hoverText}`}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}