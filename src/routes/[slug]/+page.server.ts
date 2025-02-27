import type { PageServerLoad } from './$types'
// import { getURLBySlug } from '$lib/getURLBySlug'
import { SLUG_PREFIX } from '$lib/constants/slug'

// get url by slug

// export function load() {
//   redirect(307, '/b')
// }

import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, platform }) => {
  console.log('load --------------------------------------------------')
  const { slug } = params
  const key = `${SLUG_PREFIX}${slug}`
  let url

  try {
    console.log('try- --------------')
    url = await platform?.env.BINDING_NAME.get(key, 'text')
    console.log('url:', url)
  }
  catch (error) {
    console.log('catch- --------------', error)
  }

  if (url) {
    return redirect(302, url)
  }

  // const url = await getURLBySlug(slug)

  console.log('slug:', slug)

  return {
    slug,
    url,
  }
}
