type InfoCardProps = {
    title: string;
    description: string;
    items: string[];
};

export function InfoCard({
    title,
    description,
    items,
}: InfoCardProps) {
    return (
        <article className="group rounded-2xl border bg-card p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary">
                {title.slice(0, 1)}
            </div>

            <h3 className="text-lg font-bold">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                    <li
                        key={item}
                        className="rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </article>
    );
}