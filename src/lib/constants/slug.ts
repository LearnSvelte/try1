export const SLUG_PREFIX = 'SLUG_'

export const KV_PREFIX_SLUG = 'SLUG_'

export function buildKvPrefixSlug (slug: string): string {
  return `${KV_PREFIX_SLUG}${slug}`
}
