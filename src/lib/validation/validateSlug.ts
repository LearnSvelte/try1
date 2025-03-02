export function validateSlug (slug: string, takenSlugs: string[]): {
  isValid: boolean
  errorMessage: string
} {
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
