import { catchError } from './catchError'
import { checkKVByKey } from './checkKVByKey'

export const SAVE_ERRORS = {
  KEY_EXISTS: '❌ Ключ уже существует в KV!',
  WRITE_ERROR: '❌ Ошибка при записи в KV!',
}

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
    throw new Error(SAVE_ERRORS.WRITE_ERROR)
  }
}

/** @throws */
export async function saveToKV ({ key, value }: { key: string, value: string }): Promise<true> {
  const [checkError, checkResult] = await catchError(checkKVByKey(key))

  if (checkError)
    throw checkError

  if (checkResult)
    throw new Error(SAVE_ERRORS.KEY_EXISTS)

  const [postError, postResult] = await catchError(postToKV({ key, value }))

  if (postError)
    throw postError

  if (!postResult)
    throw new Error(SAVE_ERRORS.WRITE_ERROR)

  return true
}
