import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'

// export const load: PageServerLoad = async () => {
//   return {
//     formState: 'idle',
//   }
// }

export const actions = {
  save: async ({ request, fetch }) => {
    const data = await request.formData()
    const url = data.get('url')
    const slug = data.get('slug')

    await fetch('/api/saveShortUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, url }),
    })

    // const _response = await fetch('/api/stats', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ slug, url, stat: clickData }),
    // })

    // implement logic later
    return {
      formState: 'success',
      submittedUrl: url,
      submittedSlug: slug,
    }
  },

  resetForm: async () => {
    throw redirect(303, '/') // Redirect to force a reload
  },
} satisfies Actions
