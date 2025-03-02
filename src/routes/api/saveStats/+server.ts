import type { RequestHandler } from './$types'
import {
  buildKvPrefixStats,
  buildStatsPayload,
  isStatsValid,
  isStatValid,
} from '$lib/entities/stat'
import { getKVOrErrorRes } from '$lib/server'
import { isNonEmptyString, unknownErrorResponse } from '$lib/shared'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, platform }) => {
  const [kvErrorRes, kv] = getKVOrErrorRes(platform)
  if (kvErrorRes)
    return kvErrorRes

  try {
    const { slug, stat }: { slug?: unknown, stat?: unknown } = await request.json()

    if (!isStatValid(stat) || !isNonEmptyString(slug))
      return json({ error: 'Invalid stat, or missing slug' }, { status: 400 })

    const kvKeyStats = buildKvPrefixStats(slug)

    const previousStats = await kv.get(`${kvKeyStats}`, 'json')

    if (!isStatsValid(previousStats) && previousStats !== null)
      return json({ error: 'Invalid previous stats' }, { status: 400 })

    const payload = buildStatsPayload(stat, previousStats)

    await kv.put(kvKeyStats, JSON.stringify(payload))
    return new Response(`Saved ${kvKeyStats}`, { status: 200 })
  }
  catch (error) {
    return unknownErrorResponse(error)
  }
}
