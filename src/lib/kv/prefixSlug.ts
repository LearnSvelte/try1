export const KV_PREFIX_SLUG = 'SLUG_'

export function buildKvPrefixSlug (slug: string): string {
  return `${KV_PREFIX_SLUG}${slug}`
}

export function getSlugFromPrefixedSlugKey (key: string): string {
  return key.split(KV_PREFIX_SLUG)[1]
}
