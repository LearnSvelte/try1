import { SLUG_PREFIX } from './constants/slug'
import { getValueByKey } from './kvUtils/getValueByKey'

export async function getURLBySlug (slug: string): Promise<string | null> {
  const key = `${SLUG_PREFIX}${slug}`

  const { value, exists } = await getValueByKey(key)

  console.log('getURLBySlug value:', value)
  return value
}
