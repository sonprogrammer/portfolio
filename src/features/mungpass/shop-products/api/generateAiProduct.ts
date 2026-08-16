'use server'

import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export interface MAiProductRes {
    name: string
    price: number
    durationMinutes: number
    overtimeUnitMins: number
    overtimeUnitPrice: number
    gracePeriodMins: number
}

export async function generateAiProduct(): Promise<MAiProductRes> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('gemini api key is not registered')
    }

    const res = await gemini.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `
멍패스라는 애견카페/반려견 시설 서비스의 가상 이용 상품을 1개 생성해줘.

상품 예시:
- 유치원 3시간
- 유치원 6시간
- 데이케어 4시간
- 놀이방 2시간
- 호텔 반일
- 호텔 1일

조건:
- 실제 애견카페에서 판매할 법한 자연스러운 상품
- 상품명은 짧고 이해하기 쉽게
- 가격은 한국 원화 기준
- 기본 이용 시간은 분 단위
- 초과 시간 단위는 분 단위
- 초과 요금은 한국 원화 기준
- 유예 시간은 분 단위
- 매번 다양한 상품을 생성
`,
        config: {
            responseMimeType: 'application/json',
            responseJsonSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    price: {
                        type: 'integer',
                        minimum: 5000,
                        maximum: 100000
                    },
                    durationMinutes: {
                        type: 'integer',
                        minimum: 60,
                        maximum: 1440
                    },
                    overtimeUnitMins: {
                        type: 'integer',
                        minimum: 10,
                        maximum: 120
                    },
                    overtimeUnitPrice: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 30000
                    },
                    gracePeriodMins: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 60
                    }
                },
                required: [
                    'name',
                    'price',
                    'durationMinutes',
                    'overtimeUnitMins',
                    'overtimeUnitPrice',
                    'gracePeriodMins'
                ],
                additionalProperties: false
            }
        }
    })

    if(!res.text){
        throw new Error('ai 상품 정보를 생성하지 못했습니다.')
    }

    const product = JSON.parse(res.text) as MAiProductRes

    return product
    
}