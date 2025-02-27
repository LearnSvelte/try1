export function getValueByKey(key: string): Promise<string | null> {
  return kv.get(key) // error here
}
