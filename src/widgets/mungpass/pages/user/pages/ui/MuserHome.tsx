import { QrCheckIn } from "@/features/mungpass/check-in/ui";
import { DogManager } from "@/features/mungpass/dog/ui";

export function MuserHome() {
    return (
        <div className="grid grid-cols-2 gap-10">
            <section>
                <div>
                    <h2 className="text-xl font-bold">
                        내 반려견
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        함께 멍패스를 이용할 반려견을 관리해보세요.
                    </p>
                </div>

                <DogManager />
            </section>

            <section>
                <div>
                    <h2 className="text-xl font-bold">
                        매장 이용
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        매장의 QR을 스캔하고 상품을 선택해 이용을 시작해보세요.
                    </p>
                </div>

                <QrCheckIn />
            </section>
        </div>
    )
}