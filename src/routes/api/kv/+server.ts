import type { RequestHandler } from './$types'
import { getKV } from '$lib/server/getKV'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, platform }) => {
  const [res, kv] = getKV(platform)
  if (res)
    return res

  try {
    const { key, value } = (await request.json()) as { key?: string, value?: string }
    if (!key || !value)
      return json({ error: 'Missing key or value' }, { status: 400 })

    await kv.put(key, value)
    return new Response(`Saved ${key}: ${value}`, { status: 200 })
  }
  catch (error) {
    console.error('KV put error:', error)
    return new Response(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}

export const GET: RequestHandler = async ({ request, platform }) => {
  const [res, kv] = getKV(platform)
  if (res)
    return res

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
  const [res, kv] = getKV(platform)
  if (res)
    return res

  try {
    const { key } = (await request.json()) as { key?: string }

    if (!key)
      return new Response(JSON.stringify({ error: 'Key is required' }), { status: 400 })

    await kv.delete(key)

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
  catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })
  }
}
