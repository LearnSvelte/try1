import { saveToKV } from './saveToKV'

const SLUG_PREFIX = 'SLUG:'

/** @throws */
export function saveURL({ url, slug }: { url: string, slug: string }): Promise<true> {
  const key = `${SLUG_PREFIX}${slug}`
  return saveToKV({ key, value: url })
}
