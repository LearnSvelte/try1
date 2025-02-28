import { SLUG_PREFIX } from './constants/slug'
import { saveToKV, SAVE_ERRORS } from './saveToKV'

export {SAVE_ERRORS}

/** @throws */
export function saveURL ({ url, slug }: { url: string, slug: string }): Promise<true> {
  const key = `${SLUG_PREFIX}${slug}`
  return saveToKV({ key, value: url })
}
