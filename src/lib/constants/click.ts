export const CLICK_PREFIX = 'CLICK_'

export function buildClickKey (slug: string): string {
  return `${CLICK_PREFIX}${slug}`
}
