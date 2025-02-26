<script>
  let message = ''

  async function saveToKV() {
    const response = await fetch('/api/kv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'testKey', value: 'Hello from SvelteKit & Cloudflare!' }),
    })

    if (response.ok) {
      message = '✅ Данные успешно записаны в KV!'
    }
    else {
      message = '❌ Ошибка при записи в KV!'
    }
  }
</script>

<button on:click={saveToKV} class="btn">
  Записать в KV
</button>

<p>{message}</p>
