<script lang="ts">
  import { getSlugFromPrefixedSlugKey } from '$lib/constants'
  import { onMount } from 'svelte'

  let slugs: string[] = $state([])

  async function fetchSlugs () {
    const res = await fetch('/api/slugList')
    const keys = await res.json() as string[]
    slugs = keys.map(k => getSlugFromPrefixedSlugKey(k)).sort()
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

    if (res.ok) {
      slugs = slugs.filter(s => s !== slug)
    }
    else {
      console.error(`Delete fails`)
    }
  }

  onMount(fetchSlugs)
</script>

<ul>
  {#each slugs as slug}
    <li>
      <a href="/{slug}">{slug}</a>
      <a href="/{slug}/stats">(stats)</a>
      <button
        type="button"
        data-slug={slug}
        style="padding: 0 0.5em"
        onclick={deleteKey}
      >🚮 delete</button>
    </li>
  {/each}
</ul>
