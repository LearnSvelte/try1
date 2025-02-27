import type { PageServerLoad } from './$types'
// import { getURLBySlug } from '$lib/getURLBySlug'
import { SLUG_PREFIX } from '$lib/constants/slug'

// get url by slug

// export function load() {
//   redirect(307, '/b')
// }

export const load: PageServerLoad = async ({ params, platform, request }) => {
  console.log('load --------------------------------------------------')

  const _country = request.headers.get('cf-ipcountry') ?? 'Unknown'
  const _ip = request.headers.get('cf-connecting-ip') ?? 'Unknown'
  const _userAgent = request.headers.get('user-agent') ?? 'Unknown'
  const _timestamp = new Date().toISOString()

  const { slug } = params
  const key = `${SLUG_PREFIX}${slug}`
  let url

  try {
    url = await platform?.env.BINDING_NAME.get(key, 'text')

    // const { value, metadata } = await platform?.env.BINDING_NAME.getWithMetadata(key, { type: 'text' })
    // console.log('metadata-----------', metadata)

    console.log('url:', url)
  }
  catch (error) {
    console.log('catch- --------------', error)
  }

  if (url) {
    // count visit
    // return redirect(302, url)
  }

  // console.log('slug:', slug)

  return {
    slug,
    url,
  }
}
