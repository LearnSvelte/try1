export interface Stat {
  country: string
  ip: string
  userAgent: string
  timestamp: string
}

export function isStatsValid (stats: unknown): stats is Stat[] {
  if (!Array.isArray(stats))
    return false

  return stats.every((stat) => {
    return (
      typeof stat.country === 'string'
      && typeof stat.ip === 'string'
      && typeof stat.userAgent === 'string'
      && typeof stat.timestamp === 'string'
      && !Number.isNaN(Date.parse(stat.timestamp))
    )
  })
}
