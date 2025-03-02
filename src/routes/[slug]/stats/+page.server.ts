import type { Stat } from '$lib/entities/stat/types'
import type { PageServerLoad } from './$types'
import { buildKvPrefixSlug } from '$lib/entities/slug'
import { buildKvPrefixStats } from '$lib/entities/stat'
import { getKVOrErrorInstance } from '$lib/server'
import { catchError } from '$lib/shared'
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
