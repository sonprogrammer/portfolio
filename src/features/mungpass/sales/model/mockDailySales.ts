import { MSalesSummary } from './types'

export const mockSalesSummary: MSalesSummary = {
    month: '2026-08',

    totalSales: 2680000,
    totalVisits: 81,
    averageSalesPerVisit: 33086,

    topSalesDay: {
        date: '2026-08-08',
        label: '8/8',
        sales: 420000,
        visits: 12
    },

    dailySales: [
        { date: '2026-08-01', label: '8/1', sales: 120000, visits: 4 },
        { date: '2026-08-02', label: '8/2', sales: 185000, visits: 6 },
        { date: '2026-08-03', label: '8/3', sales: 90000, visits: 3 },
        { date: '2026-08-04', label: '8/4', sales: 230000, visits: 7 },
        { date: '2026-08-05', label: '8/5', sales: 145000, visits: 5 },
        { date: '2026-08-06', label: '8/6', sales: 310000, visits: 9 },
        { date: '2026-08-07', label: '8/7', sales: 195000, visits: 6 },
        { date: '2026-08-08', label: '8/8', sales: 420000, visits: 12 },
        { date: '2026-08-09', label: '8/9', sales: 350000, visits: 10 },
        { date: '2026-08-10', label: '8/10', sales: 170000, visits: 5 },
        { date: '2026-08-11', label: '8/11', sales: 260000, visits: 8 },
        { date: '2026-08-12', label: '8/12', sales: 205000, visits: 6 }
    ],

    productSales: [
        {
            productId: 'mock-product-1',
            name: '유치원 3시간',
            sales: 1120000,
            count: 40
        },
        {
            productId: 'mock-product-2',
            name: '유치원 6시간',
            sales: 875000,
            count: 25
        },
        {
            productId: 'mock-product-3',
            name: '호텔 1일',
            sales: 685000,
            count: 16
        }
    ]
}