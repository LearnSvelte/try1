import { CLICK_PREFIX } from './constants/click'
import { saveToKV } from './saveToKV'

export function saveClick ({ slug, value }: { slug: string, value: string }): Promise<true> {
  const key = `${CLICK_PREFIX}${slug}`
  return saveToKV({ key, value })
}
