import type { Stat } from '$lib/types/stats'
import type { PageServerLoad } from './$types'
import { catchError } from '$lib/catchError'
import { buildKvPrefixSlug, buildKvPrefixStats } from '$lib/constants'

import { getKV } from '$lib/server/getKV'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, platform }) => {
  const { slug } = params
  // let url: null | string = null

  const [kvError, kv] = getKV(platform)
  // const [kvError, kv] = getKV(undefined)

  if (kvError) {
    return {
      slug,
      error: kvError,
    }
  }

  // if (!kv) {
  //   return {
  //     slug,
  //     error: 'KV not available',
  //   }
  // }

  const [urlError, url] = await catchError(kv.get(buildKvPrefixSlug(slug), 'text'))

  const [statsError, stats] = await catchError(kv.get<Stat[]>(buildKvPrefixStats(slug), 'json'))

  return {
    slug,
    url,
    stats,
    error: urlError || statsError,
  }
}
