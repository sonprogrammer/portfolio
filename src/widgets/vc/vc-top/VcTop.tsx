import { CoinSearch } from "@/features/vc/coin-search/ui";
import { VcGuestBtn } from "@/features/vc/guest/ui";
import { VcNav } from "@/features/vc/nav/ui";

export function VcTop() {
    return (
        <div className='relative w-full flex items-center'>
            <div className="flex gap-5 w-full justify-center">
                <VcNav />
                <CoinSearch />
            </div>
            <div className="absolute right-5">
                <VcGuestBtn />
            </div>
        </div>
    )
}