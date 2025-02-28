import type { Stat } from '$lib/types/stats'
import type { PageServerLoad } from './$types'
import { catchError } from '$lib/catchError'
import { buildKvPrefixSlug, buildKvPrefixStats } from '$lib/constants'

import { getKV } from '$lib/server/getKV'

export const load: PageServerLoad = async ({ params, fetch, platform }) => {
  const { slug } = params
  let url: null | string = null
  let stats: null | unknown = null

  const [_, kv] = getKV(platform)

  if (!kv) {
    return {
      slug,
      error: 'KV not available',
    }
  }

  try {
    url = await kv.get(buildKvPrefixSlug(slug), 'text')
    // stats = await kv.get(buildKvPrefixStats(slug), 'json')
  }
  catch (error) {
    console.log('KV error:', error)
  }

  const statsPrefix = buildKvPrefixStats(slug)

  const [statsError, statsData] = await catchError(kv.get<Stat[]>(buildKvPrefixStats(slug), 'json'))

  // try-catch!

  // const res = await fetch(`/api/click?slug=${slug}`)
  // const body = await res.json()
  // const { stats, url } = JSON.parse(body.value)

  return {
    slug,
    stats: statsData,
    statsError,
    statsPrefix,
    url,
    debug: 'debug',
  }
}
