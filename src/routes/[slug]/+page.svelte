<!-- TODO: get long url -->
<script lang="ts">
  import { page } from '$app/state'

  /* getURLBySlug returns Promise<string> */
  import { getURLBySlug } from '$lib/getURLBySlug'

  const slug = $derived(page.params.slug)

  let url = $state('')

  $effect(() => {
    if (slug) {
      getURLBySlug(slug).then((result) => {
        url = result ?? ''
      })
    }
  })
</script>

<p>{slug}</p>
{#if url}
  <a href={url}>Link to {slug}</a>
{:else}
  <p>Loading link...</p>
{/if}
