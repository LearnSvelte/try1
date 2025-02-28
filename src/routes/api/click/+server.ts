import type { RequestHandler } from './$types'
import { buildKvPrefixStats } from '$lib/constants'
import { buildClickKey, CLICK_PREFIX } from '$lib/constants/click'
import { buildStatsPayload } from '$lib/dataUtils/buildStatsPayload'
import { getKV } from '$lib/server/getKV'
import { isStatsValid, isStatValid } from '$lib/types/stats'
import { isNonEmptyString } from '$lib/validation'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, platform }) => {
  const [res, kv] = getKV(platform)
  if (res)
    return res

  try {
    // const { slug, data } = await request.json()

    const { slug, url, stat } = (await request.json()) as { slug?: unknown, url?: unknown, stat?: unknown }
    // if (!slug || !url || isStatsValid(stat))
    //   return json({ error: 'Missing slug, url or stat' }, { status: 400 })

    if (!isStatValid(stat) || !isNonEmptyString(slug) || !isNonEmptyString(url))
      return json({ error: 'Invalid stat, or missing slug or url' }, { status: 400 })

    const previousStats = await kv.get(`${CLICK_PREFIX}${slug}`, 'json')

    if (!isStatsValid(previousStats) && previousStats !== null)
      return json({ error: 'Invalid previous stats' }, { status: 400 })

    const payload = buildStatsPayload(url, stat, previousStats)
    const key = buildKvPrefixStats(slug)

    await kv.put(key, JSON.stringify(payload))
    return new Response(`Saved ${key}`, { status: 200 })
  }
  catch (error) {
    console.error('KV put error:', error)
    return new Response(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}

export const GET: RequestHandler = async ({ request, platform }) => {
  if (!platform || !platform.env) {
    return new Response(JSON.stringify({ error: 'Platform env is undefined' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const kv = platform.env.BINDING_NAME

  if (!kv) {
    return new Response(JSON.stringify({ error: 'KV binding is missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const key = `${CLICK_PREFIX}${slug}`

    const value = await kv.get(key)

    console.log('////////////value:', value)

    return new Response(
      JSON.stringify({
        exists: value !== null,
        value,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
  catch (error) {
    console.error('❌ KV get error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
