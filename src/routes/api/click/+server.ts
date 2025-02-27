import type { RequestHandler } from './$types'
import { CLICK_PREFIX } from '$lib/constants/click'

export const POST: RequestHandler = async ({ request, platform }) => {
  if (!platform || !platform.env) {
    return new Response('❌ Platform env is undefined', { status: 500 })
  }

  const kv = platform.env.BINDING_NAME

  if (!kv) {
    return new Response('❌ KV binding is missing', { status: 500 })
  }

  try {
    const { slug, data } = await request.json()

    const previousValue = await kv.get(`${CLICK_PREFIX}${slug}`, 'json')
    const value = previousValue ? [data, ...previousValue] : [data]

    const key = `${CLICK_PREFIX}${slug}`
    await kv.put(key, JSON.stringify(value))
    return new Response(`✅ Saved ${key}`, { status: 200 })
  }
  catch (error) {
    console.error('❌ KV put error:', error)
    return new Response(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}

export const GET: RequestHandler = async ({ request, platform }) => {
  if (!platform || !platform.env) {
    return new Response(JSON.stringify({ error: 'Platform env is undefined' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const kv = platform.env.BINDING_NAME

  if (!kv) {
    return new Response(JSON.stringify({ error: 'KV binding is missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const key = `${CLICK_PREFIX}${slug}`

    const value = await kv.get(key)

    console.log('////////////value:', value)

    return new Response(
      JSON.stringify({
        exists: value !== null,
        value,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
  catch (error) {
    console.error('❌ KV get error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
