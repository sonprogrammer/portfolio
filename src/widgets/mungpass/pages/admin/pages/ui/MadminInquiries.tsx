import { InquiryManageManager } from "@/features/mungpass/admin/inquiry-manage/ui";


export function MadminInquiries() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-extrabold text-gray-100">
                    문의 관리
                </h1>

                <p className="mt-1 text-sm font-semibold text-gray-500">
                    회원이 등록한 1:1 문의를 확인하고 답변합니다.
                </p>
            </div>

            <InquiryManageManager />
        </div>
    )
}