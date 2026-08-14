
type SectionHeaderProps = {
    number?: string;
    title: string;
    description?: string;
};

export function SectionHeader({
    number,
    title,
    description,
}: SectionHeaderProps) {
    return (
        <div className="flex items-start gap-4 pb-5">
            {number && (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary">
                    {number}
                </span>
            )}

            <div className="space-y-2">
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                    {title}
                </h2>

                {description && (
                    <p className=" text-sm ">
                        {description}
                    </p>
                )}
                
            </div>
        </div>
    );
}