'use client'

import {
    AlertCircle,
  Clock,
  Wallet,
} from 'lucide-react'



import { MyPetUsageAllInfo } from '@/features/mungpass/check-in/model'
import { useTimer } from '@/features/mungpass/check-in/model/useTimer'
import { format } from 'date-fns/format'
import { motion } from 'framer-motion'



interface LiveUsageCardProps {
  dogUsage: MyPetUsageAllInfo
}

export function LiveUsageCard({
  dogUsage,
}: LiveUsageCardProps) {
  const gracePeriodMins = dogUsage.product.grace_period_mins

    const { displayMins, isOverTime, progress, extraCharge } = useTimer({
        startedAt: dogUsage.started_at,
        expectedEndAt: dogUsage.expected_ended_at,
        endedAt: dogUsage.ended_at,
        gracePeriodMins: gracePeriodMins,
        overtimePolicy: {
            unitMins: dogUsage.product.overtime_unit_mins,
            unitPrice: dogUsage.product.overtime_unit_price
        }
    })

    const startTime = format(dogUsage.started_at, 'HH:mm')
    const endTime = format(dogUsage.expected_ended_at, 'HH:mm')

  return (
   <motion.div
    layout
    className={`relative overflow-hidden p-6 rounded-[2.5rem] border shadow-2xl backdrop-blur-xl transition-all duration-500 ${
        isOverTime 
            ? 'border-red-500/50 bg-red-950/30 shadow-red-500/10' 
            : 'border-gray-800 bg-gray-950/80 shadow-gray-950/50'
    }`}
>
    <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4 items-center">
            <div className="relative">
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-gray-950 rounded-full" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-extrabold text-gray-100 tracking-tight leading-none">{dogUsage.dog.name}</h3>
                    <span className="px-2 py-0.5 bg-orange-500 text-white text-[9px] font-black rounded-full animate-pulse tracking-tighter">LIVE</span>
                </div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{dogUsage.product.name}</p>
            </div>
        </div>

        <div>
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-extrabold text-xs shadow-sm ${
                isOverTime ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
            }`}>
                {isOverTime ? <AlertCircle className="w-3.5 h-3.5 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />}
                <div className="flex flex-col justify-center items-center leading-tight">
                    <span className="underline decoration-dotted">{dogUsage.shop.name}</span>
                    <span className="text-[10px]">{isOverTime ? '시간 초과' : '이용 중'}</span>
                </div>
            </div>
        </div>
    </div>

    <div className="flex flex-col items-center mb-8">
        <div className="relative inline-block">
            <span className={`text-7xl font-black tracking-tighter tabular-nums leading-none ${
                isOverTime ? 'text-red-500' : 'text-gray-100'
            }`}>
                {isOverTime && "+"}{displayMins}
            </span>
            <span className={`absolute -right-6 bottom-2 font-black text-lg ${
                isOverTime ? 'text-red-500' : 'text-gray-500'
            }`}>m</span>
        </div>

        {!isOverTime && displayMins > 0 && (
            <div className="mt-2.5 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
                <p className="text-[10px] font-black text-orange-400">
                    유예 시간 {gracePeriodMins}분 적용 중
                </p>
            </div>
        )}

        <div className="w-full mt-6 h-3 bg-gray-900 rounded-full overflow-hidden relative border border-gray-800">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full rounded-full ${
                    isOverTime 
                        ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' 
                        : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                }`}
            />
        </div>

        <div className="w-full flex justify-between mt-3 px-1">
            <div className="flex flex-col items-start">
                <span className="text-[9px] font-bold text-gray-500 uppercase leading-none">Check-in</span>
                <span className="text-[12px] font-black text-gray-300">{startTime}</span>
            </div>
            
            <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-gray-500 uppercase leading-none text-center">유예시간</span>
                <span className="text-[11px] font-black text-gray-400">{gracePeriodMins}m</span>
            </div>

            <div className="flex flex-col items-end">
                <span className={`text-[9px] font-bold uppercase leading-none ${isOverTime ? 'text-red-400' : 'text-gray-500'}`}>
                    {isOverTime ? 'LIMIT OVER' : 'CHECK-OUT'}
                </span>
                <span className={`text-[12px] font-black ${isOverTime ? 'text-red-500' : 'text-orange-400'}`}>
                    {endTime}
                </span>
            </div>
        </div>
    </div>

    <div className={`flex items-center justify-between p-4 rounded-3xl border transition-colors ${
        isOverTime 
            ? 'border-red-500/40 bg-red-900/30 text-gray-100' 
            : 'border-gray-800 bg-gray-900/60 text-gray-300'
    }`}>
        <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${
                isOverTime 
                    ? 'border-red-500/30 bg-red-500/20 text-red-300' 
                    : 'border-orange-500/20 bg-orange-500/10 text-orange-400'
            }`}>
                <Wallet className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400">
                    {isOverTime ? "현재 초과 요금" : "추가 요금 안내"}
                </span>
                <span className={`text-lg font-black leading-tight ${isOverTime ? 'text-red-400' : 'text-gray-100'}`}>
                    {isOverTime ? `${extraCharge.toLocaleString()}원` : `0원`}
                </span>
            </div>
        </div>

        <div className="text-right flex flex-col items-end">
            <span className="text-[9px] font-bold text-gray-500 uppercase">Unit Price</span>
            <span className="text-[11px] font-black text-gray-400 tracking-tight">
                {dogUsage.product.overtime_unit_mins}분 / {dogUsage.product.overtime_unit_price.toLocaleString()}원
            </span>
        </div>
    </div>
</motion.div>
  )
}