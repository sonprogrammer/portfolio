export function Scroll({to}: {to: string}) {
    return (
        <div className="absolute bottom-30 left-1/2 -translate-x-1/2 hidden lg:block">
            <a
                href={`#${to}`}
                className="group flex flex-col items-center gap-2 text-xs font-semibold text-zinc-400 transition-colors hover:text-purple-200"
            >
                <span>Scroll</span>

                <span className="relative h-10 w-px overflow-hidden bg-zinc-700">
                    <span className="absolute left-0 top-0 h-4 w-px animate-[scrollDown_1.6s_ease-in-out_infinite] bg-white" />
                </span>
            </a>
        </div>
    )
}