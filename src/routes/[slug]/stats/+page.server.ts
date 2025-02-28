import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { slug } = params

  const res = await fetch(`/api/click?slug=${slug}`)
  const data = await res.json()
  const stats = JSON.parse(data.value)

  return {
    slug,
    stats,
  }
}
