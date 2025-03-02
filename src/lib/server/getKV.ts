import type { RequestEvent } from '@sveltejs/kit'
import { errorResponseWithCode } from './errorResponse'

export function getKVOrErrorInstance (platform: RequestEvent['platform']): [Error] | [null, KVNamespace] {
  if (!platform || !platform.env)
    return [new Error('Platform env is undefined')]

  const kv = platform.env.KV1
  if (!kv)
    return [new Error('KV binding is missing')]

  return [null, kv]
}

export function getKVOrErrorRes (platform: RequestEvent['platform']): [Response] | [null, KVNamespace] {
  const [err, kv] = getKVOrErrorInstance(platform)
  return err
    ? [errorResponseWithCode('INTERNAL_ERROR', err.message)]
    : [null, kv]
}
