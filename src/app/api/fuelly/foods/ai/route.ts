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

     const foodNutritionSystemPrompt = `
너는 음식 영양 정보를 분석하는 AI다.

규칙
1. 입력값이 실제 음식인지 먼저 판단한다.
2. 실제 음식이면 isFood는 true다.
3. 음식이 아니거나 음식으로 판단하기 어려우면 isFood는 false다.
4. isFood가 false이면 calorie, protein, unit은 모두 null이다.
5. calorie는 일반적인 1회 제공량 기준 칼로리(kcal)다.
6. protein은 일반적인 1회 제공량 기준 단백질(g)이다.
7. unit은 영양 단위가 아니라 일반적인 1회 제공량을 의미한다.
8. 정확한 제품이나 제공량이 특정되지 않았다면 일반적으로 통용되는 평균적인 제공량을 기준으로 추정한다.
9. 존재하지 않는 음식이나 제품 정보를 만들어내지 않는다.
10. 설명, 인사말, 마크다운은 작성하지 않는다.
`

        const completion = await groq.chat.completions.create(
            {
                model: 'openai/gpt-oss-20b',
                messages: [
                    {
                        role: 'system',
                        content: foodNutritionSystemPrompt,
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
                                isFood: { type: 'boolean'},
                                name: {
                                    type: 'string'
                                },
                                calorie: {type: 'number'},
                                protein: {type: 'number'},
                                unit: {type: 'string'}
                            },
                            required: [
                                'isFood', 'name', 'calorie', 'protein', 'unit'
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
        console.error('AI 음식 조회 실패:',error)

        return NextResponse.json({message:'AI 음식 정보 조회에 실패했습니다.'},{status: 500,})
    }
}