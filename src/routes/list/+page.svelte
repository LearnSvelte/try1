<script lang="ts">
  import type { ListChunk } from '$lib/entities/listChunk/types'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'

  const slugs = writable<string[]>([])
  function addSlugs (newSlugs: string[]) {
    slugs.update(existingSlugs => [...existingSlugs, ...newSlugs])
  }
  function removeSlug (slug: string) {
    slugs.update(existingSlugs => existingSlugs.filter(s => s !== slug))
  }

  let cursor: string | undefined = $state(undefined)
  let isLoading = $state(false)

  async function fetchSlugs () {
    isLoading = true
    const res = await fetch(cursor ? `/api/slugList?cursor=${cursor}` : '/api/slugList')
    const data = await res.json() as ListChunk
    cursor = data.cursor
    addSlugs(data.slugs)
    isLoading = false
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
      removeSlug(slug)
    }
    else {
      console.error(`Delete fails`)
    }
  }

  onMount(fetchSlugs)
</script>

<ul>
  {#each $slugs as slug}
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

<p>{isLoading ? 'Loading...' : ''}</p>

{#if cursor}
  <button
    type="button"
    disabled={isLoading}
    onclick={fetchSlugs}
  >Load more</button>
{/if}
