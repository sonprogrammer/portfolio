'use client'

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

import { MDailySales } from '../model'

interface DailySalesChartProps {
    data: MDailySales[]
}

export function DailySalesChart({ data }: DailySalesChartProps) {
    return (
        <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6">
            <div>
                <h2 className="text-lg font-extrabold text-gray-100">
                    일별 매출
                </h2>

                <p className="mt-1 text-sm font-semibold text-gray-500">
                    이번 달 일별 매출 추이입니다.
                </p>
            </div>

            <div className="mt-6 h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#1f2937" strokeDasharray="3 3" />

                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 11 }}
                            interval="preserveStartEnd"
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 11 }}
                            tickFormatter={value => `${Math.round(Number(value) / 10000)}만`}
                            width={45}
                        />

                        <Tooltip
                            cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                            contentStyle={{
                                background: '#111827',
                                border: '1px solid #374151',
                                borderRadius: '12px'
                            }}
                            labelStyle={{
                                color: '#9ca3af'
                            }}
                            formatter={value => [
                                `${Number(value).toLocaleString()}원`,
                                '매출'
                            ]}
                        />

                        <Bar
                            dataKey="sales"
                            fill="#10b981"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={36}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}