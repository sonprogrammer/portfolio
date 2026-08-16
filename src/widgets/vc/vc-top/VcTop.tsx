import { CoinSearch } from "@/features/vc/coin-search/ui";
import { VcGuestBtn } from "@/features/vc/guest/ui";
import { VcNav } from "@/features/vc/nav/ui";

export function VcTop() {
    return (
        <div className="w-full relative flex flex-col lg:flex-row">
            <div className="flex w-full justify-center gap-3 items-center">
                <VcNav />
                <CoinSearch />
            </div>

            <div className="mt-4 flex w-full items-center justify-end lg:absolute lg:-top-1 lg:right-0">
                <VcGuestBtn />
            </div>
        </div>
    )
}