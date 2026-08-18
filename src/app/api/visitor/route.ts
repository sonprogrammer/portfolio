import { NextRequest, NextResponse } from "next/server";
import { Client } from '@notionhq/client'

const notion = new Client({auth: process.env.NOTION_TOKEN})

const DATABASE_ID = process.env.NOTION_DATA_SOURCE_ID

export async function POST(req: NextRequest){
    try {
        if(!DATABASE_ID){
            return NextResponse.json({message: 'there is no notions database id '},{status: 500})
        }

        const body = await req.json()

        const { page, referrer, device} = body

        await notion.pages.create({
            parent: {database_id: DATABASE_ID},
            properties: {
                '유입 경로' : {
                    title: [
                        {
                            text: {
                                content: referrer ||'직접 방문'
                            }
                        }
                    ]
                },
                '페이지' : {
                    rich_text: [
                        {
                            text: {
                                content: page || '/'
                            }
                        }
                    ]
                },
                '방문 시간': {
                    date: {
                        start: new Date().toISOString()
                    }
                },
                '디바이스': {
                    select: {
                        name: device || 'unknown'
                    }
                }
            }
        })
        return NextResponse.json({success: true})
    } catch (error) {
        console.log('방문 기록 저장 실패', error)
        return NextResponse.json({message: '방문 기록 저장  실패'}, {status: 500})
    }
}