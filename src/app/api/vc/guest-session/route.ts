import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import type { VcGuest, VcGuestSessionRes } from "@/entities/vc/guest/model";
import { connectMongoDB } from "@/shared/db/mongodb";
import { VcGuestAccount } from "@/entities/vc/guest/model/guestSchema";
import { cookies } from 'next/headers';
const VC_GUEST_COOKIE = 'vc_guest_session'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

interface GuestDocument {
    _id: { toString(): string }

    sessionId: string;
    nickname: string;
    krwBalance: number;
    lockedKrw: number
}

function serializeGuest(guest: GuestDocument): VcGuest {
    return {
        id: guest._id.toString(),
        nickname: guest.nickname,
        krwBalance: guest.krwBalance,
        lockedKrw: guest.lockedKrw,
    }
}

function createRes(guest: VcGuest | null) {
    return NextResponse.json<VcGuestSessionRes>({ guest })
}

export async function GET() {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get(VC_GUEST_COOKIE)?.value
    
    if (!sessionId) return createRes(null)

    await connectMongoDB()

    const guest = await VcGuestAccount.findOne({ sessionId }).lean<GuestDocument | null>()

    if (!guest) {
        const res = createRes(null)
        res.cookies.delete(VC_GUEST_COOKIE)
        return res
    }

    return createRes(serializeGuest(guest))
}

export async function POST() {
    const cookieStore = await cookies()

    const currentSessionId = cookieStore.get(VC_GUEST_COOKIE)?.value
    
    await connectMongoDB()

    if (currentSessionId) {
        const existGuest = await VcGuestAccount.findOne({ sessionId: currentSessionId }).lean<GuestDocument | null>()

        if (existGuest) {
            return createRes(serializeGuest(existGuest))
        }

    }

    const sessionId = randomUUID()

    const guest = await VcGuestAccount.create({
        sessionId,
        nickname: `VC-${sessionId.slice(0, 4).toUpperCase()}`,
        krwBalance: 10_000_000,
        lockedKrw: 0
    })

    const res = createRes(serializeGuest(guest))

    res.cookies.set(VC_GUEST_COOKIE, sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: COOKIE_MAX_AGE
    })

    return res


}

export async function DELETE() {
    const cookieStore = await cookies()

    const sessionId = cookieStore.get(VC_GUEST_COOKIE)?.value

    if (sessionId) {
        await connectMongoDB();

        await VcGuestAccount.deleteOne({
            sessionId,
        });
    }

    const response = createRes(null);

    response.cookies.delete(VC_GUEST_COOKIE);

    return response;
}