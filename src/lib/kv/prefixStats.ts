export const KV_PREFIX_STATS = 'STATS_'

export function buildKvPrefixStats (slug: string): string {
  return `${KV_PREFIX_STATS}${slug}`
}
