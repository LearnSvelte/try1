<script lang="ts">
  import { page } from '$app/state'
  import RedirectPreview from '$lib/components/RedirectPreview.svelte'
  import StatsTable from '$lib/components/StatsTable.svelte'

  const { data } = $props()

  const pageUrl = page.url

  let shortUrl = $derived(pageUrl.toString().split('/').slice(0, -1).join('/'))
</script>

<!-- <p>
  <a href={shortUrl}>{shortUrl}</a> 👉
  {data.url ?? 'url is missing'}
</p> -->
<RedirectPreview shortUrl={shortUrl} longUrl={data.url} />

{#if data.stats}
  <p>Total redirects: {data.stats.length}</p>
  <StatsTable stats={data.stats} />
{:else}
  <p>No stats yet</p>
{/if}
