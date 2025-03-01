export function validateUrl (url: string): { isValid: boolean, errorMessage: string } {
  try {
    const parsedUrl = new URL(url)
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { isValid: false, errorMessage: 'URL must start with http:// or https://' }
    }

    return { isValid: true, errorMessage: '' }
  }
  catch {
    return { isValid: false, errorMessage: '' }
  }
}
