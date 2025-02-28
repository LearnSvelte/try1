<script lang="ts">
  import { getSlugFromPrefixedSlugKey } from '$lib/constants'
  import { onMount } from 'svelte'

  let slugs: string[] = $state([])

  async function fetchSlugs () {
    const res = await fetch('/api/slugList')
    const keys = await res.json() as string[]
    slugs = keys.map(k => getSlugFromPrefixedSlugKey(k))
  }

  async function deleteKey (event: Event) {
    const button = event.currentTarget as HTMLButtonElement
    const slug = button.dataset.slug
    if (!slug)
      return

    const res = await fetch('/api/deleteUrlAndStats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })

    const data: {success: boolean, error?: unknown} = await res.json()

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
      <button type="button" data-slug={slug} onclick={deleteKey}>delete</button>
    </li>
  {/each}
</ul>
