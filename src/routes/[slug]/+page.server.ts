import type { Stat } from '$lib/entities/stat/types'
import type { PageServerLoad } from './$types'
import { buildKvPrefixSlug } from '$lib/entities/slug'
import { getKVOrErrorInstance } from '$lib/server'
import { catchError } from '$lib/shared'
import { error, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, platform, request, fetch }) => {
  const { slug } = params
  const key = buildKvPrefixSlug(slug)

  const [kvError, kv] = getKVOrErrorInstance(platform)
  if (kvError) return error(500, kvError.message)

  const [urlError, url] = await catchError(kv.get(key, 'text'))
  if (urlError) return error(500, urlError.message)
  if (!url) return error(404, 'Not found')

  const country = request.headers.get('cf-ipcountry') ?? 'Unknown'
  const ip = request.headers.get('cf-connecting-ip') ?? 'Unknown'
  const userAgent = request.headers.get('user-agent') ?? 'Unknown'
  const timestamp = new Date().toISOString()

  const stat: Stat = {
    country,
    ip,
    userAgent,
    timestamp,
  }

  const res = await fetch('/api/saveStats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, url, stat }),
  })

  if (!res.ok) return error(res.status, 'Failed to save stats')

  return redirect(302, url)
}
