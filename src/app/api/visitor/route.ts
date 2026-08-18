import { NextRequest, NextResponse } from "next/server";
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const DATABASE_ID = process.env.NOTION_DATA_SOURCE_ID

export async function POST(req: NextRequest) {
    try {

        if (process.env.NODE_ENV !== 'production') {
            return NextResponse.json({ success: true })
        }
        if (!DATABASE_ID) {
            return NextResponse.json({ message: 'there is no notions database id ' }, { status: 500 })
        }

        const body = await req.json()

        const { page, referrer, device } = body

        await notion.pages.create({
            parent: { database_id: DATABASE_ID },
            properties: {
                이름: {
                    title: [
                        {
                            text: {
                                content: '포트폴리오 방문',
                            },
                        },
                    ],
                },

                '접속 시간': {
                    date: {
                        start: new Date().toISOString(),
                    },
                },

                경로: {
                    rich_text: [
                        {
                            text: {
                                content: page || '/',
                            },
                        },
                    ],
                },

                '유입 경로': {
                    rich_text: [
                        {
                            text: {
                                content: referrer || '직접 방문',
                            },
                        },
                    ],
                },

                기기: {
                    select: {
                        name: device || 'desktop',
                    },
                },
            },
        });
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log('방문 기록 저장 실패', error)
        return NextResponse.json({ message: '방문 기록 저장  실패' }, { status: 500 })
    }
}