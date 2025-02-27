import { catchError } from './catchError'
import { checkKVByKey } from './checkKVByKey'

async function postToKV ({ key, value }: { key: string, value: string }): Promise<true> {
  const response = await fetch('/api/kv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  })

  if (response.ok) {
    return true
  }
  else {
    throw new Error('❌ Ошибка при записи в KV!')
  }
}

/** @throws */
export async function saveToKV ({ key, value }: { key: string, value: string }): Promise<true> {
  const [checkError, checkResult] = await catchError(checkKVByKey(key))

  if (checkError)
    throw checkError

  if (checkResult)
    throw new Error('❌ Ключ уже существует в KV!')

  const [postError, postResult] = await catchError(postToKV({ key, value }))

  if (postError)
    throw postError

  if (!postResult)
    throw new Error('❌ Ошибка при записи в KV!')

  return true
}
