import type { Stat } from '$lib/types/stats'
import type { PageServerLoad } from './$types'
import { SLUG_PREFIX } from '$lib/constants/slug'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, platform, request, fetch }) => {
  console.log('load --------------------------------------------------')

  const country = request.headers.get('cf-ipcountry') ?? 'Unknown'
  const ip = request.headers.get('cf-connecting-ip') ?? 'Unknown'
  const userAgent = request.headers.get('user-agent') ?? 'Unknown'
  const timestamp = new Date().toISOString()

  const { slug } = params
  const key = `${SLUG_PREFIX}${slug}`
  let url
  let urlError: string = ''

  try {
    url = await platform?.env.BINDING_NAME.get(key, 'text')
  }
  catch (error) {
    urlError = (error as Error).message
  }

  if (url) {
    const clickData: Stat = {
      country,
      ip,
      userAgent,
      timestamp,
    }

    const _response = await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, url, stat: clickData }),
    })

    // console.log('response:', response)

    // count visit
    return redirect(302, url)
  }

  // console.log('slug:', slug)

  return {
    slug,
    url,
    urlError,
  }
}
