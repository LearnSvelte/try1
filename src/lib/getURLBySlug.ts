import { SLUG_PREFIX } from './constants/slug'
import { getValueByKey } from './kvUtils/getValueByKey'

export async function getURLBySlug(slug: string): Promise<string | null> {
  const key = `${SLUG_PREFIX}${slug}`

  const result = await getValueByKey(key)

  return result
}
