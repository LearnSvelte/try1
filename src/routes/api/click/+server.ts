import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, platform }) => {
  if (!platform || !platform.env) {
    return new Response('❌ Platform env is undefined', { status: 500 })
  }

  const kv = platform.env.BINDING_NAME

  if (!kv) {
    return new Response('❌ KV binding is missing', { status: 500 })
  }

  try {
    const { key, value } = await request.json()
    await kv.put(key, value)
    return new Response(`✅ Saved ${key}: ${value}`, { status: 200 })
  }
  catch (error) {
    console.error('❌ KV put error:', error)
    return new Response(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}
