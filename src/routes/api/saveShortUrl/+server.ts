import type { RequestHandler } from './$types'
import { buildKvPrefixSlug } from '$lib/kv'
import { getKVOrErrorRes } from '$lib/server'
import { errorResponseWithCode } from '$lib/shared'
import { isNonEmptyString } from '$lib/validation'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, platform }) => {
  const [kvError, kv] = getKVOrErrorRes(platform)
  if (kvError)
    return kvError

  try {
    const { slug, url }: { slug: unknown, url: unknown } = await request.json()

    if (!isNonEmptyString(slug) || !isNonEmptyString(url))
      return errorResponseWithCode('INVALID_INPUT', 'Invalid slug or url')

    const key = buildKvPrefixSlug(slug)

    const existingValue = await kv.get(key)
    if (existingValue !== null)
      return errorResponseWithCode('KV_KEY_EXIST', 'Slug already exists')

    await kv.put(key, url)
    return json({ success: true, slug, url }, { status: 200 })
  }
  catch (error) {
    return errorResponseWithCode('UNKNOWN_ERROR', error instanceof Error ? error.message : 'Unknown error')
  }
}
