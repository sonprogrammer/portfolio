'use server'

import { GoogleGenAI } from '@google/genai'

export interface MAiShopRes {
    name: string;
    addressName: string;
    roadAddressName: string;
    phone: string;
}

const geminiAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function autoGenerateAiShop(): Promise<MAiShopRes> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('gemini api key is not registered')
    }

    const res = await geminiAi.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
                한국에 실제로 존재할 법한 가상의 애견카페 정보를 1개 생성해줘.

                조건:
                - 실제 사업체를 복사하지 말고 가상의 애견카페 이름을 만들어줘.
                - name은 자연스러운 한국 애견카페 이름
                - addressName은 한국 지번 주소 형태
                - roadAddressName은 addressName과 같은 지역의 자연스러운 도로명 주소
                - phone은 해당 지역번호에 맞는 한국 전화번호 형태
                - 서울에만 집중하지 말고 대한민국 여러 지역 중 랜덤하게 선택
                `,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    addressName: {
                        type: 'string'
                    },
                    roadAddressName: {
                        type: 'string'
                    },
                    phone: {
                        type: 'string'
                    }
                },
                required: ['name', 'addressName', 'roadAddressName', 'phone']
            }
        }
    })

    if(!res.text){
        throw new Error('매장 정보를 생성하지 못했습니다')
    }
    return JSON.parse(res.text) as MAiShopRes
}