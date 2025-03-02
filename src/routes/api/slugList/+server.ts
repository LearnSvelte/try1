import type { RequestHandler } from './$types'
import { getKVOrErrorRes, KV_PREFIX_SLUG as prefix } from '$lib/kv'
import { unknownErrorResponse } from '$lib/server/errorResponse'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ platform }) => {
  const [res, kv] = getKVOrErrorRes(platform)
  if (res) return res

  try {
    const result = await kv.list({ prefix, limit: 1000 })
    return json(result.keys.map(k => k.name))
  }
  catch (error) {
    return unknownErrorResponse(error)
  }
}
