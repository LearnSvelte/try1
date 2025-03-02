export function isNonEmptyString (str: unknown): str is string {
  return typeof str === 'string' && str.trim() !== ''
}
