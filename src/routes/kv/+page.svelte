<script>
  import { catchError } from '$lib/catchError'
  import { saveToKV } from '$lib/saveToKV'

  let message = ''

  const key = 'k1'
  const value = 'v1'

  async function f2() {
    const [error, result] = await catchError(saveToKV({ key, value }))
    if (error)
      console.log(error)
    console.log(result)
  }
</script>

<button on:click={f2}>
  Записать в KV
</button>

<p>{message}</p>
