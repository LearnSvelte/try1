import type { RequestHandler } from './$types'
import { buildKvPrefixSlug, validateSlug } from '$lib/entities/slug'
import { validateUrl } from '$lib/entities/url'
import { getKVOrErrorRes } from '$lib/server'
import { errorResponseWithCode } from '$lib/shared'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, platform }) => {
  const [kvError, kv] = getKVOrErrorRes(platform)
  if (kvError)
    return kvError

  try {
    const { slug, url }: { slug?: string, url?: string } = await request.json()

    if (typeof slug !== 'string' || !validateSlug(slug).isValid)
      return errorResponseWithCode('INVALID_INPUT', 'Invalid slug')

    if (typeof url !== 'string' || !validateUrl(url))
      return errorResponseWithCode('INVALID_INPUT', 'Invalid url')

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
