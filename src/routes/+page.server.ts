import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'

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
      const _body: { error: string, errorCode: string } = await res.json()

      if (res.status === 409) {
        return fail(409, {
          slug,
          exists: true,
          formState: 'error',
          errorMessage: `Slug "${slug}" already exists!`,
        })
      }

      return {
        formState: 'error',
        submittedUrl: url,
        submittedSlug: slug,
        error: 'Unknown error',
      }
    }

    return {
      formState: 'success',
      submittedUrl: url,
      submittedSlug: slug,
    }
  },

  resetForm: async () => {
    throw redirect(303, '/')
  },
} satisfies Actions
