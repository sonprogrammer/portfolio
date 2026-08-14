import 'server-only'

import { cookies } from 'next/headers'

export const COOKIE_NAME = 'fuelly-session'

export async function getFuellySessionId() {
    const cookieStore = await cookies()

    return (
        cookieStore.get(COOKIE_NAME)?.value ?? null
    )
}