'use server'

import { cookies } from 'next/headers'
import { GoogleGenAI } from '@google/genai'

import { supabaseServer } from '@/shared/db/supabase/server'

import { MGenerateSalesInsightPayload, MGenerateSalesInsightResult } from '../model/types'
import { format } from 'date-fns/format'

export async function generateAiInsight({ shopId, summary, isMockupMode }: MGenerateSalesInsightPayload): Promise<MGenerateSalesInsightResult> {
    const cookieStore = await cookies()
    const supabase = supabaseServer(cookieStore)

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error('로그인이 필요합니다.')
    }

    const { data: shop } = await supabase
        .from('shops')
        .select('id, name, status')
        .eq('id', shopId)
        .eq('owner_id', user.id)
        .maybeSingle()

    if (!shop) {
        throw new Error('접근할 수 없는 매장입니다.')
    }

    if (!isMockupMode && shop.status !== 'approved') {
        throw new Error('관리자 매장 승인 후 이용할 수 있습니다.')
    }

    if (summary.totalVisits === 0) {
        throw new Error('분석할 매출 데이터가 없습니다.')
    }

    const today = format(new Date(), 'yyyy-MM-dd')

    if (!isMockupMode) {
        const { data: existingInsight, error: existingError } = await supabase
            .from('shop_ai_insight')
            .select('id')
            .eq('shop_id', shopId)
            .eq('analysis_date', today)
            .maybeSingle()

        if (existingError) {
            throw new Error('AI 분석 여부를 확인하지 못했습니다.')
        }

        if (existingInsight) {
            throw new Error('AI 매출 분석은 하루에 한 번만 가능합니다.')
        }
        if (existingError) {
            console.error(existingError)
            throw new Error('AI 분석 여부를 확인하지 못했습니다.')
        }
    
        if (existingInsight) {
            throw new Error('AI 매출 분석은 하루에 한 번만 가능합니다.')
        }
    }


    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
        throw new Error('Gemini API Key가 설정되지 않았습니다.')
    }

    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
        contents: `
너는 반려동물 시설 매장의 매출 분석가야.

아래는 "${shop.name}" 매장의 ${summary.month} 매출 데이터야.

총 매출: ${summary.totalSales}원
총 이용 건수: ${summary.totalVisits}건
평균 객단가: ${summary.averageSalesPerVisit}원

최고 매출일:
${summary.topSalesDay
                ? `${summary.topSalesDay.date} / ${summary.topSalesDay.sales}원 / ${summary.topSalesDay.visits}건`
                : '데이터 없음'
            }

상품별 매출:
${summary.productSales.map(product =>
                `- ${product.name}: ${product.sales}원 / ${product.count}건`
            ).join('\n')}

일별 매출:
${summary.dailySales
                .filter(day => day.sales > 0)
                .map(day => `- ${day.date}: ${day.sales}원 / ${day.visits}건`)
                .join('\n')}

이 데이터를 기반으로 사장님이 바로 이해할 수 있도록 매출을 분석해줘.

조건:
- 한국어로 작성
- 4~6문장
- 매출 흐름을 설명
- 가장 성과가 좋은 상품을 언급
- 매장 운영에 적용할 수 있는 구체적인 제안 1개 포함
- 과장하지 말 것
- 데이터에 없는 사실을 만들어내지 말 것
`
    })

    const insight = response.text?.trim()

    if (!insight) {
        throw new Error('AI 매출 분석 결과를 생성하지 못했습니다.')
    }

    if (isMockupMode) {
        return {
            insight,
            isMockupMode: true,
            savedInsight: null
        }
    }

    const { data, error } = await supabase
        .from('sales_ai_insights')
        .insert({
            shop_id: shopId,
            analysis_date: today,
            insight
        })
        .select(`
            id,
            shop_id,
            analysis_date,
            insight,
            created_at
        `)
        .single()

    if (error) {
        console.error(error)

        if (error.code === '23505') {
            throw new Error('AI 매출 분석은 하루에 한 번만 가능합니다.')
        }

        throw new Error('AI 분석 결과 저장에 실패했습니다.')
    }

     return {
        insight,
        isMockupMode: false,
        savedInsight: data
    }
}