export function RoleReqText() {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-2xl">
                👋
            </div>
            <h2 className="text-xl font-bold text-gray-100">역할을 선택해 주세요</h2>
            <p className="mt-2 text-sm text-gray-500">
                트레이너 또는 멤버 중 이용하실 역할을 먼저 선택해 주세요.
            </p>
        </div>
    )
}