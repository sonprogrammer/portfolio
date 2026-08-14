import { AdminUserManager } from '@/features/mungpass/admin/user-manage/ui'

export function MadminUsers() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-extrabold text-gray-100">
                    회원 관리
                </h1>

                <p className="mt-1 text-sm font-semibold text-gray-500">
                    가입된 회원과 사장 회원의 입점 상태를 확인합니다.
                </p>
            </div>

            <AdminUserManager />
        </div>
    )
}