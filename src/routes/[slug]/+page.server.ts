import type { PageServerLoad } from './$types'
import { SLUG_PREFIX } from '$lib/constants/slug'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, platform, request, fetch }) => {
  console.log('load --------------------------------------------------')

  const _country = request.headers.get('cf-ipcountry') ?? 'Unknown'
  const _ip = request.headers.get('cf-connecting-ip') ?? 'Unknown'
  const _userAgent = request.headers.get('user-agent') ?? 'Unknown'
  const _timestamp = new Date().toISOString()

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
    const clickData = { country: _country, ip: _ip, userAgent: _userAgent, timestamp: _timestamp }

    const response = await fetch('/api/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, data: clickData }),
    })

    console.log('response:', response)

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
