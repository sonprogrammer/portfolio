import { eachDayOfInterval, format, startOfMonth } from 'date-fns'

import { MDailySales, MProductSales, MSalesSummary, MSalesUsage } from '../model/types'

export function buildSalesSummary(usages: MSalesUsage[] | null, now = new Date()): MSalesSummary {
    const month = format(now, 'yyyy-MM')
    const safeUsages = usages ?? []

    const monthUsages = safeUsages.filter(item => {
        return format(new Date(item.endedAt), 'yyyy-MM') === month
    })

    const days = eachDayOfInterval({
        start: startOfMonth(now),
        end: now
    })

    const dailyMap = new Map<string, MDailySales>()

    days.forEach(day => {
        const date = format(day, 'yyyy-MM-dd')

        dailyMap.set(date, {
            date,
            label: format(day, 'M/d'),
            sales: 0,
            visits: 0
        })
    })

    const productMap = new Map<string, MProductSales>()

    monthUsages.forEach(item => {
        const date = format(new Date(item.endedAt), 'yyyy-MM-dd')
        const daily = dailyMap.get(date)

        if (daily) {
            daily.sales += item.totalPrice
            daily.visits += 1
        }

        const product = productMap.get(item.productId)

        if (product) {
            product.sales += item.totalPrice
            product.count += 1
        } else {
            productMap.set(item.productId, {
                productId: item.productId,
                name: item.productName,
                sales: item.totalPrice,
                count: 1
            })
        }
    })

    const dailySales = [...dailyMap.values()]
    const productSales = [...productMap.values()].sort((a, b) => b.sales - a.sales)

    const totalSales = monthUsages.reduce((sum, item) => sum + item.totalPrice, 0)
    const totalVisits = monthUsages.length

    const topSalesDay = dailySales.reduce<MDailySales | null>((top, day) => {
        if (day.sales === 0) return top
        if (!top || day.sales > top.sales) return day

        return top
    }, null)

    return {
        month,
        totalSales,
        totalVisits,
        averageSalesPerVisit: totalVisits > 0 ? Math.round(totalSales / totalVisits) : 0,
        topSalesDay,
        dailySales,
        productSales
    }
}