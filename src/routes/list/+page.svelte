<script lang="ts">
  import { SLUG_PREFIX } from '$lib/constants/slug'
  import { onMount } from 'svelte'

  let slugs: string[] = $state([])

  async function fetchSlugs () {
    const res = await fetch('/api/slugList')
    const keys = await res.json()
    slugs = keys.map(k => k.split(SLUG_PREFIX)[1])
  }

  async function deleteKey (event: Event) {
    const button = event.currentTarget as HTMLButtonElement
    const slug = button.dataset.slug
    const key = SLUG_PREFIX + slug

    if (!key)
      return

    const res = await fetch('/api/kv', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })

    const data = await res.json()

    if (data.success) {
      slugs = slugs.filter(s => s !== slug) // Удаляем из списка
    }
    else {
      alert(`Ошибка удаления: ${data.error}`)
    }
  }

  onMount(fetchSlugs)

</script>

<ul>
  {#each slugs as slug}
    <li>
      <a href="/{slug}">{slug}</a>
      <a href="/{slug}/stats">(stats)</a>
      <button type="button" data-slug={slug} on:click={deleteKey}>delete</button>

    </li>
  {/each}
</ul>
