'use client'

import { BntyUser } from "@/entities/bnty/user/model/userTypes";
import { QrCode, QrReader } from "@/features/bnty/qr/ui";
import { BntyRole } from "@/features/bnty/role/model/RoleStore";
import { useGetUser } from "@/features/bnty/user/model/useGetUser";
import { MemberList } from "@/features/bnty/user/ui";


export function QrCheckIn({ role, user }: { role: BntyRole, user: BntyUser }) {
    const ptCount = user?.ptCount
    const { data: trainer } = useGetUser('trainer')

    if (role === 'member') {
        if (!trainer) {
            return (
                <div>
                    <p className="text-center text-sm text-gray-400">
                        *먼저 트레이너 탭에서 트레이너를 등록해주세요
                    </p>
                    <p className="text-center text-sm text-gray-400">
                        *등록된 트레이너와 연결을 위한 과정입니다.
                    </p>

                </div>
            )
        }
        return (
            <section>
                <div className="flex items-center justify-center">
                    <QrReader
                        ptCount={ptCount as number}
                        trainerId={trainer.id}
                        memberId={user.id}
                    />
                </div>
            </section>
        )
    }
    return (
        <section className="flex flex-col md:flex-row justify-center items-stretch gap-6  rounded-2xl shadow-2xl max-w-4xl mx-auto text-neutral-100">

            <div className="flex flex-col items-center justify-center p-6 bg-neutral-900 border border-neutral-800 rounded-xl w-full md:w-1/2 shadow-inner">
                <h3 className="text-xs font-semibold text-neutral-400 mb-4 tracking-wider uppercase">트레이너 QR 코드</h3>
                <QrCode trainerId={user?.id} />
            </div>

            <div className="flex flex-col justify-center p-6 bg-neutral-900 border border-neutral-800 rounded-xl w-full md:w-1/2 shadow-inner">
                <h3 className="text-xs font-semibold text-neutral-400 mb-4 tracking-wider uppercase">관리 회원 목록</h3>
                <MemberList trainerId={user?.id} />
            </div>
        </section>
    )
}