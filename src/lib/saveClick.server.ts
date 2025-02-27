import { CLICK_PREFIX } from './constants/click'

export function saveClick({ slug }: { slug: string }): Promise<true> {
  const key = `${CLICK_PREFIX}${slug}`
  return saveToKV({ key, value: '1' })
}
