import type { ListChunk } from '$lib/entities/listChunk/types'
import type { RequestHandler } from './$types'
import { getSlugFromPrefixedSlugKey, KV_PREFIX_SLUG as prefix } from '$lib/entities/slug'
import { getKVOrErrorRes } from '$lib/server'
import { unknownErrorResponse } from '$lib/shared'
import { json } from '@sveltejs/kit'

/* Limit is 1 for demo purpose, should be 1000 */
const limit = 1

export const GET: RequestHandler = async ({ platform, request }) => {
  const [res, kv] = getKVOrErrorRes(platform)
  if (res) return res

  const url = new URL(request.url)
  const cursor = url.searchParams.get('cursor')

  try {
    const payload: { cursor?: string, prefix: string, limit: number } = { prefix, limit }
    if (cursor) payload.cursor = cursor

    const result = await kv.list(payload) as KVNamespaceListResult<unknown, string> & { cursor?: string }

    const data: ListChunk = {
      slugs: result.keys.map(k => getSlugFromPrefixedSlugKey(k.name)),
      cursor: result.cursor,
      isListComplete: result.list_complete,
    }

    return json(data)
  }
  catch (error) {
    return unknownErrorResponse(error)
  }
}
