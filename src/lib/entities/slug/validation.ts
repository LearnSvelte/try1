import { isNonEmptyString } from '$lib/shared'

export function validateSlug (slug: unknown, takenSlugs: string[] = []): {
  isValid: boolean
  errorMessage: string
} {
  if (!isNonEmptyString(slug)) {
    return {
      isValid: false,
      errorMessage: 'Slug must be a non-empty string.',
    }
  }

  const isValidFormat = /^[a-z0-9]+$/i.test(slug)

  const isUnique = !takenSlugs.includes(slug)

  let errorMessage = ''
  if (!isValidFormat) {
    errorMessage = 'Slug must contain only letters and numbers.'
  }
  else if (!isUnique) {
    errorMessage = 'Slug is already taken.'
  }

  return {
    isValid: isValidFormat && isUnique,
    errorMessage,
  }
}
