import type { PageServerLoad } from './$types'
// import { getURLBySlug } from '$lib/getURLBySlug'
import { SLUG_PREFIX } from '$lib/constants/slug'
import { saveClick } from '$lib/saveClick'

// get url by slug

// export function load() {
//   redirect(307, '/b')
// }

export const load: PageServerLoad = async ({ params, platform, request, fetch }) => {
  console.log('load --------------------------------------------------')

  const _country = request.headers.get('cf-ipcountry') ?? 'Unknown'
  const _ip = request.headers.get('cf-connecting-ip') ?? 'Unknown'
  const _userAgent = request.headers.get('user-agent') ?? 'Unknown'
  const _timestamp = new Date().toISOString()

  const { slug } = params
  const key = `${SLUG_PREFIX}${slug}`
  let url

  const { put, get } = platform?.env.BINDING_NAME

  try {
    url = await get(key, 'text')

    // const { value, metadata } = await platform?.env.BINDING_NAME.getWithMetadata(key, { type: 'text' })
    // console.log('metadata-----------', metadata)

    console.log('url:', url)
  }
  catch (error) {
    console.log('catch- --------------', error)
  }

  if (url) {
    const clickData = JSON.stringify({ country: _country, ip: _ip, userAgent: _userAgent, timestamp: _timestamp })

    // const res = url = await platform?.env.BINDING_NAME.put(key, 'text')

    // await saveClick({ slug, value: clickData })

    const response = await fetch('/api/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, value: clickData }),
    })

    console.log('response:', response)

    // count visit
    // return redirect(302, url)
  }

  // console.log('slug:', slug)

  return {
    slug,
    url,
  }
}
