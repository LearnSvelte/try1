import type { RequestHandler } from './$types'
import { buildKvPrefixSlug } from '$lib/entities/slug'
import {  buildKvPrefixStats } from '$lib/entities/stat'
import { getKVOrErrorInstance } from '$lib/server'
import { isNonEmptyString, errorResponseWithCode } from '$lib/shared'

export const POST: RequestHandler = async ({ request, platform }) => {
  const [res, kv] = getKVOrErrorInstance(platform)
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
