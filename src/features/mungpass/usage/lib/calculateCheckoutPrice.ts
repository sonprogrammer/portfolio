interface CalculateCheckoutPriceParams {
    expectedEndedAt: string
    checkoutAt: string | Date
    basePrice: number
    gracePeriodMins: number
    overtimeUnitMins: number
    overtimeUnitPrice: number
}

export function calculateCheckoutPrice({
    expectedEndedAt,
    checkoutAt,
    basePrice,
    gracePeriodMins,
    overtimeUnitMins,
    overtimeUnitPrice
}: CalculateCheckoutPriceParams) {
    const expectedTime = new Date(expectedEndedAt).getTime()
    const checkoutTime = new Date(checkoutAt).getTime()

    const overtimeMs = Math.max(0, checkoutTime - expectedTime)
    const overtimeMinutes = Math.ceil(overtimeMs / 1000 / 60)
    const chargeableMinutes = Math.max(0, overtimeMinutes - gracePeriodMins)

    const overtimeUnits = chargeableMinutes > 0
        ? Math.ceil(chargeableMinutes / overtimeUnitMins)
        : 0

    const extraCharge = overtimeUnits * overtimeUnitPrice

    return {
        overtimeMinutes,
        chargeableMinutes,
        extraCharge,
        totalPrice: basePrice + extraCharge
    }
}