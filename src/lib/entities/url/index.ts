export function validateUrl (url: string): { isValid: boolean } {
  try {
    const _parsedUrl = new URL(url)
    return { isValid: true }
  }
  catch {
    return { isValid: false }
  }
}
