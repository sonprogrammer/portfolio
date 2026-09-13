import 'server-only'

import { createHash } from 'node:crypto'
import { supabaseAdmin } from '@/shared/db/supabase/admin'


const REQUEST_LIMIT = 10
const WINDOW_SECONDS = 10 * 60

interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfter: number
}

function getClientIp(request: Request) {
  const realIp = request.headers.get('x-real-ip')

  if (realIp) {
    return realIp
  }

  const forwardedFor = request.headers.get('x-forwarded-for')

  return forwardedFor?.split(',')[0]?.trim() ?? 'unknown'
}

export async function consumePortfolioAiRateLimit(
  request: Request,
): Promise<RateLimitResult> {
  const salt = process.env.PORTFOLIO_AI_RATE_LIMIT

  if (!salt) {
    throw new Error(
      'PORTFOLIO_AI_RATE_LIMIT가 설정되지 않았습니다.',
    )
  }

  const ip = getClientIp(request)

  const identifier = createHash('sha256')
    .update(`${salt}:${ip}`)
    .digest('hex')

  const supabase = supabaseAdmin()

  const { data, error } = await supabase.rpc(
    'consume_portfolio_ai_rate_limit',
    {
      p_identifier: identifier,
      p_limit: REQUEST_LIMIT,
      p_window_seconds: WINDOW_SECONDS,
    },
  )

  if (error) {
    throw new Error(`요청 제한 확인 실패: ${error.message}`)
  }

  const result = data?.[0]

  if (!result) {
    throw new Error('요청 제한 결과가 없습니다.')
  }

  return {
    allowed: result.allowed,
    remaining: result.remaining,
    retryAfter: result.retry_after,
  }
}