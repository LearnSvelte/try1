import type { Actions, PageServerLoad } from './$types'
import { error, fail, redirect } from '@sveltejs/kit'

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

    const res = await fetch('/api/saveShortUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, url }),
    })

    if (!res.ok) {
      const body: {error: string, errorCode: string} = await res.json()

      console.log('Error:--------', body, res.status);

      if (res.status === 409) {
        return fail(409, { slug, exists: true, formState: 'error'});


        // return {
        //   // formState: 'error',
        //   status: 409,
        //   submittedUrl: url,
        //   submittedSlug: slug,
        //   error: 'Slug already exists',
        // }
      }

      // return error(res.status, body)
      return {
        formState: 'error',
        submittedUrl: url,
        submittedSlug: slug,
        error: 'R Unknown error',
      }
    }

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
