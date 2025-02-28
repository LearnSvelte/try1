import type { Stat } from '$lib/types/stats'
import type { PageServerLoad } from './$types'
import { catchError } from '$lib/catchError'
import { buildKvPrefixSlug, buildKvPrefixStats } from '$lib/constants'

import { getKV } from '$lib/server/getKV'

export const load: PageServerLoad = async ({ params, fetch, platform }) => {
  const { slug } = params
  let url: null | string = null

  const [_, kv] = getKV(platform)

  if (!kv) {
    return {
      slug,
      error: 'KV not available',
    }
  }

  try {
    url = await kv.get(buildKvPrefixSlug(slug), 'text')
  }
  catch (error) {
    console.log('KV error:', error)
  }

  const [statsError, statsData] = await catchError(kv.get<Stat[]>(buildKvPrefixStats(slug), 'json'))

  return {
    slug,
    stats: statsData,
    statsError,
    url,
    debug: 'debug',
  }
}
