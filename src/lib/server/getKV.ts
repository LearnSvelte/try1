// src/lib/kv-utils.ts
import type { RequestEvent } from '@sveltejs/kit'

export function getKV(platform: RequestEvent['platform']): [null, KVNamespace] | [Response] {
  if (!platform || !platform.env)
    return [new Response('Platform env is undefined', { status: 500 })]
  const kv = platform.env.BINDING_NAME
  if (!kv)
    return [new Response('KV binding is missing', { status: 500 })]
  return [null, kv]
}
