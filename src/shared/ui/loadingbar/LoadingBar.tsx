export function LoadingBar({ text = '불러오는 중...' }: { text?: string }) {
    return (
        <div
            role="status"
            className="flex min-h-48 flex-col items-center justify-center gap-3"
        >
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-indigo-500" />

            <p className="text-sm text-gray-400">{text}</p>
        </div>
    )
}