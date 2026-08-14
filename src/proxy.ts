import type { NextRequest } from 'next/server'

import { updateSession } from '@/shared/db/supabase/proxy'

export async function proxy(
    request: NextRequest,
) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        '/mungpass/:path*',
        '/api/mungpass/:path*',
    ],
}