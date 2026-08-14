import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { getFuellySessionId } from '@/features/fuelly/auth/lib/fuelly-session/getFuellySessionId'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request){
    try {
        const sessionId = await getFuellySessionId()

        if (!sessionId) {
            return NextResponse.json(
                {
                    message:
                        'login required',
                },
                {
                    status: 401,
                }
            )
        }
        const name = await req.json()

        if(!name?.trim()){
            return NextResponse.json({message: '음식 이름을 입력해주세요'}, {status:400})
        }

        const completion = await groq.chat.completions.create(
            {
                model: 'openai/gpt-oss-20b',
                messages: [
                    {
                        role: 'system',
                        content: '음식의 일반적인 1회 섭취 기준 영양정보를 추정한다. calorie은 kcal, protein은 g 단위다. unit은 "100g", "1개", "1잔"처럼 사람이 이해하기 쉬운 기준량으로 반환한다.',
                    },{
                        role: 'user',
                        content: name.trim()
                    }
                ],
                temperature: 0.2,
                response_format: {
                    type: 'json_schema',
                    json_schema: {
                        name: 'food_nutrition',
                        strict: true,
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string'
                                },
                                calorie: {type: 'number'},
                                protein: {type: 'number'},
                                unit: {type: 'string'}
                            },
                            required: [
                                'name', 'calorie', 'protein', 'unit'
                            ],
                            additionalProperties: false
                        }
                    }
                }
            }
        )

        const content = completion.choices[0]?.message.content

        if(!content){
            throw new Error('ai response si empty')
        }

        const food = JSON.parse(content)

        return NextResponse.json({food})

    } catch (error) {
        console.error(
            'AI 음식 조회 실패:',
            error,
        )

        return NextResponse.json(
            {
                message:
                    'AI 음식 정보 조회에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}