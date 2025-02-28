import type { RequestHandler } from './$types'
import { getKV } from '$lib/server/getKV'
import { isNonEmptyString } from '$lib/validation'
import { buildKvPrefixSlug, buildKvPrefixStats } from '$lib/constants'

const ERROR_MESSAGES = {
  INVALID_SLUG: 'Invalid slug',
  UNKNOWN_ERROR: 'Unknown error',
}

type ResponseBody = {
  success: boolean
  error?: string
}

export const POST: RequestHandler = async ({ request, platform }) => {
  const [res, kv] = getKV(platform)
  if (res) return res

  try {
    const { slug }: { slug: unknown } = await request.json()

    if (!isNonEmptyString(slug)) {
      const body: ResponseBody = {
        success: false,
        error: ERROR_MESSAGES.INVALID_SLUG
      }
      return new Response(JSON.stringify(body), { status: 400 })
    }

    const key1 = buildKvPrefixSlug(slug)
    const key2 = buildKvPrefixStats(slug)

    await Promise.all([kv.delete(key1), kv.delete(key2)])

    const body: ResponseBody = {
      success: true
    }
    return new Response(JSON.stringify(body), { status: 204 })
  }
  catch (error) {
    console.error('KV delete url and stats error:', error)

    const body: ResponseBody = {
      success: false,
      error: error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR
    }
    return new Response(JSON.stringify(body), { status: 500 })
  }
}
