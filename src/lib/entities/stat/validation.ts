import type { Stat } from './types'

export function isStatValid (stat: unknown): stat is Stat {
  return (
    typeof stat === 'object'
    && stat !== null
    && typeof (stat as Stat).country === 'string'
    && typeof (stat as Stat).ip === 'string'
    && typeof (stat as Stat).userAgent === 'string'
    && typeof (stat as Stat).timestamp === 'string'
    && !Number.isNaN(Date.parse((stat as Stat).timestamp))
  )
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
