import type { Stat } from '../types/stats'
import { isStatsValid } from '../types/stats'

const STATS_LIMIT = 4000

export function buildStatsPayload (newStat: Stat, previousStats: unknown): Stat[] {
  const validPreviousStats = isStatsValid(previousStats) ? previousStats : []
  return [newStat, ...validPreviousStats.slice(0, STATS_LIMIT - 1)]
}
