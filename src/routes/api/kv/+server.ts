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
    const key = url.searchParams.get('key')

    if (!key) {
      return new Response(JSON.stringify({ error: 'Missing key parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const value = await kv.get(key)

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

export const DELETE: RequestHandler = async ({ platform, request }) => {
  if (!platform?.env?.BINDING_NAME) {
    return new Response(JSON.stringify({ error: 'KV not available' }), { status: 500 })
  }

  try {
    const { key } = await request.json()

    if (!key) {
      return new Response(JSON.stringify({ error: 'Key is required' }), { status: 400 })
    }

    await platform.env.BINDING_NAME.delete(key)

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
  catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })
  }
}
