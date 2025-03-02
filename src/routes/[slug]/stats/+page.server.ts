import type { Stat } from '$lib/types/stats'
import type { PageServerLoad } from './$types'
import { buildKvPrefixSlug, buildKvPrefixStats } from '$lib/kv'
import { getKVOrErrorInstance } from '$lib/server'
import { catchError } from '$lib/shared/catchError'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, platform }) => {
  const { slug } = params

  const [kvError, kv] = getKVOrErrorInstance(platform)
  if (kvError) return error(500, kvError.message)

  const [urlError, url] = await catchError(kv.get(buildKvPrefixSlug(slug), 'text'))

  if (urlError) return error(500, urlError.message)
  if (!url) return error(404, 'URL not found')

  const [statsError, stats] = await catchError(kv.get<Stat[]>(buildKvPrefixStats(slug), 'json'))

  return {
    slug,
    url,
    stats,
    error: statsError,
  }
}
