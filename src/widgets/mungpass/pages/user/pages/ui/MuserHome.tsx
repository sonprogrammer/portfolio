import { QrCheckIn } from "@/features/mungpass/check-in/ui";
import { DogManager } from "@/features/mungpass/dog/ui";

export function MuserHome() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10 pt-2">
            <section className="min-w-0">
                <div>
                    <h2 className="text-lg font-bold sm:text-xl">
                        내 반려견
                    </h2>

                    <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm">
                        함께 멍패스를 이용할 반려견을 관리해보세요.
                    </p>
                </div>

                <div className="mt-4 min-w-0">
                    <DogManager />
                </div>
            </section>

            <section className="min-w-0">
                <div>
                    <h2 className="text-lg font-bold sm:text-xl">
                        매장 이용
                    </h2>

                    <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm">
                        매장의 QR을 스캔하고 상품을 선택해 이용을 시작해보세요.
                    </p>
                </div>

                <div className="mt-4 min-w-0">
                    <QrCheckIn />
                </div>
            </section>
        </div>
    )
}