import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ platform }) => {
  if (!platform?.env?.BINDING_NAME) {
    return new Response(JSON.stringify({ error: 'KV not available' }), { status: 500 })
  }

  try {
    const result = await platform.env.BINDING_NAME.list({ prefix: 'SLUG_', limit: 1000 })

    return new Response(JSON.stringify(result.keys.map(k => k.name)), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
  catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })
  }
}
