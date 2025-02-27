import type { PageServerLoad } from './$types'
import { SLUG_PREFIX } from '$lib/constants/slug'

// export async function load ({ fetch }) {
//   const response = await fetch('/api/click?slug=page')
//   const data = await response.json()

//   return data
// }

export const load: PageServerLoad = async ({ params, platform, request, fetch }) => {
  const { slug } = params

  const res = await fetch(`/api/click?slug=${slug}`)
  const data = await res.json()

  return {
    slug,
    stats: data.value,
  }
}
