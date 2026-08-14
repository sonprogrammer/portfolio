import { getFuellySessionId } from "@/features/fuelly/auth/lib/fuelly-session/getFuellySessionId";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
    try {
        const sessionId = await getFuellySessionId()
        if (!sessionId) {
            return NextResponse.json({ message: 'login required' }, { status: 401 })
        }

        const { remainCalorie, remainProtein, goal } = await req.json()

        const completion = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages: [
                {
                    role: 'system',
                    content: `사용자의 남은 칼로리와 단백질 목표를 기준으로 현실적으로 먹을 수 있는 한 끼 메뉴 3개를 추천한다.
                            반드시 JSON만 반환한다. 반드시 한국어로만 작성해야한다.

{
    "meals": [
        {
            "name": "메뉴 이름",
            "calorie": 500,
            "protein": 40,
            "unit": "1인분",
            "description": "추천 이유"
        }
    ]
}
                        `,
                },
                {
                    role: 'user',
                    content: `
남은 칼로리: ${remainCalorie}kcal
남은 단백질: ${remainProtein}g
목표: ${goal}
                        `,
                },
            ],
            response_format: {type: 'json_object'}
        })

        const content = completion.choices[0]?.message.content

        if(!content){
            throw new Error('AI responsed is empty')
        }

        const data = JSON.parse(content)

        return NextResponse.json(data)
    } catch (error) {
        console.error(
            'AI 메뉴 추천 실패:',
            error,
        )

        return NextResponse.json(
            {
                message:
                    'AI 메뉴 추천에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}