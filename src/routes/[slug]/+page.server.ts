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
    const clickData = {
      country: country,
      ip: ip,
      userAgent: userAgent,
      timestamp: timestamp
    }

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
