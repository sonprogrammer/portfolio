import { BntyUserModel } from "@/entities/bnty/user/model/userSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams

        const demoSession = searchParams.get('demoSession')
        const role = searchParams.get('role')

        if(!demoSession || !role){
            return NextResponse.json({message:'세션, 역할이 필요함'}, {status:400})
        }

        if(role !=='member' && role !== 'trainer'){
            return NextResponse.json({message: '역할을 확인하세요'}, {status: 400}) 
        }

        await connectMongoDB()

        const user = await BntyUserModel.findOne({
            demoSessionId: demoSession,
            role
        })

        if(!user){
            return NextResponse.json({user: null}, {status: 200})
        }

        return NextResponse.json({user: {
            id: user._id.toString(),
            name: user.name,
            role: user.role,
            ptCount: user.ptCount
        }}, {status: 200})
        
    } catch (error) {
        console.error('bnty  사용자 조회 실패', error)
        return NextResponse.json({message: '사용자 조회 실패'}, {status: 500})
    }
}