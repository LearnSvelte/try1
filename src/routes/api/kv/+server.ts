import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, platform }) => {
  console.log('🔍 platform:', platform)
  console.log('🔍 platform.env:', platform?.env)

  if (!platform || !platform.env) {
    return new Response('❌ Platform env is undefined', { status: 500 })
  }

  const kv = platform.env.BINDING_NAME
  console.log('🔍 BINDING_NAME:', kv)

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
    return new Response(`❌ Error: ${error.message}`, { status: 500 })
  }
}
