import type { RequestHandler } from './$types'
import { buildKvPrefixSlug, buildKvPrefixStats } from '$lib/constants'
import { errorResponseWithCode } from '$lib/server/errorResponse'
import { getKV } from '$lib/server/getKV'
import { isNonEmptyString } from '$lib/validation'

export const POST: RequestHandler = async ({ request, platform }) => {
  const [res, kv] = getKV(platform)
  if (res) return res

  try {
    const { slug }: { slug: unknown } = await request.json()

    if (!isNonEmptyString(slug)) {
      return errorResponseWithCode('INVALID_INPUT', 'Invalid slug')
    }

    const key1 = buildKvPrefixSlug(slug)
    const key2 = buildKvPrefixStats(slug)

    await Promise.all([kv.delete(key1), kv.delete(key2)])

    return new Response(null, { status: 204 })
  }
  catch (error) {
    return errorResponseWithCode('UNKNOWN_ERROR', error instanceof Error ? error.message : 'Unknown error')
  }
}
