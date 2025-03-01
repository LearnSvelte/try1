import type { RequestEvent } from '@sveltejs/kit'
import { errorResponseWithCode } from './errorResponse'

export function getKV (platform: RequestEvent['platform']): [null, KVNamespace] | [Response] {
  if (!platform || !platform.env)
    return [errorResponseWithCode('INTERNAL_ERROR', 'Platform env is undefined')]

  const kv = platform.env.BINDING_NAME
  if (!kv)
    return [errorResponseWithCode('INTERNAL_ERROR', 'KV binding is missing')]

  return [null, kv]
}

export function getKVAndError (platform: RequestEvent['platform']): [null, KVNamespace] | [Error] {
  if (!platform || !platform.env)
    return [new Error('Platform env is undefined')]

  const kv = platform.env.BINDING_NAME
  if (!kv)
    return [new Error('KV binding is missing')]

  return [null, kv]
}
