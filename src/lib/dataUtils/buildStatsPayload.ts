import type { Stat } from '../types/stats'
import { isStatsValid } from '../types/stats'

export function buildStatsPayload (newStat: Stat, previousStats: unknown): Stat[] {
  const validPreviousStats = isStatsValid(previousStats) ? previousStats : []
  return [newStat, ...validPreviousStats]
}

// export function buildStatsPayload (url: string, newStat: Stat, previousStats: unknown): {
//   url: string
//   stats: Stat[]
// } {
//   const validPreviousStats = isStatsValid(previousStats) ? previousStats : []

//   const stats = [newStat, ...validPreviousStats]
//   return { url, stats }
// }
