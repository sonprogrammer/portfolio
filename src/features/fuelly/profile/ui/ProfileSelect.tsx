

interface ProfileSelectProps {
    name: string;
    label: string;
    children: React.ReactNode;
    defaultValue?: string;
}

export function ProfileSelect({
    name,
    label,
    children,
    defaultValue
}: ProfileSelectProps) {
    return (
        <label>
            <span className="mb-2 block text-sm text-white/70">
                {label}
            </span>

            <select
                name={name}
                required
                defaultValue={defaultValue}
                className="h-12 w-full rounded-xl border border-white/10 bg-[#17191d] px-4 pr-10 text-white outline-none"
            >
                {children}
            </select>
        </label>
    );
}