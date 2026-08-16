
interface RemainNutritionProps {
    remainCalorie: number
    remainProtein: number
    exceedCalorie: number
    exceedProtein: number
}

export function RemainNutrition({ remainCalorie, remainProtein, exceedCalorie, exceedProtein }: RemainNutritionProps) {
    return (
        <section className="gap-2 sm:gap-4 grid grid-cols-2">
            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5 text-center">
                <p className="text-xs text-gray-50 sm:text-sm">
                    남은 칼로리
                </p>

                <p
                    className={`mt-2 text-sm font-bold sm:text-2xl ${exceedCalorie > 0
                            ? 'text-red-400'
                            : 'text-gray-200/50'
                        }`}
                >
                    {exceedCalorie > 0
                        ? `${exceedCalorie} kcal 초과`
                        : `${remainCalorie} kcal`}
                </p>
            </div>

            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5 text-center">
                <p className="text-xs sm:text-sm text-gray-50">
                    남은 단백질
                </p>

                <p
                    className={`mt-2 text-sm sm:text-2xl font-bold ${exceedProtein > 0
                            ? 'text-red-400'
                            : 'text-gray-200/50'
                        }`}
                >
                    {exceedProtein > 0
                        ? `${exceedProtein}g 초과`
                        : `${remainProtein}g`}
                </p>
            </div>
        </section>
    )
}