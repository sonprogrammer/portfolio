export interface MSalesUsage {
    id: string
    productId: string
    productName: string
    endedAt: string
    totalPrice: number
}

export interface MDailySales {
    date: string
    label: string
    sales: number
    visits: number
}

export interface MProductSales {
    productId: string
    name: string
    sales: number
    count: number
}

export interface MSalesSummary {
    month: string
    totalSales: number
    totalVisits: number
    averageSalesPerVisit: number
    topSalesDay: MDailySales | null
    dailySales: MDailySales[]
    productSales: MProductSales[]
}

export interface MGenerateSalesInsightPayload {
    shopId: string
    summary: MSalesSummary
    isMockupMode: boolean
}

export interface MGenerateSalesInsightResult {
    insight: string
    isMockupMode: boolean
    savedInsight: MSalesInsight | null
}

export interface MSalesInsight {
    id: string
    shop_id: string
    analysis_date: string
    insight: string
    created_at: string
}