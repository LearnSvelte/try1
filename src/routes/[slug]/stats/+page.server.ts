import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { slug } = params

  const res = await fetch(`/api/click?slug=${slug}`)
  const body = await res.json()
  const stats = JSON.parse(body.value)

  return {
    slug,
    stats,
  }
}
