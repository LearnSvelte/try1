<script lang="ts">
  import StatsTable from '$lib/components/StatsTable.svelte'
  import { page } from '$app/state'

  const { data } = $props();

  const pageUrl = page.url

  let shortUrl = $derived(pageUrl.toString().split('/').slice(0, -1).join('/'));
</script>

<p>
  <a href={shortUrl}>{shortUrl}</a> 👉
  {data.url ?? 'url is missing'}</p>

{#if data.stats}
  <p>Total redirects: {data.stats.length}</p>
  <StatsTable stats={data.stats} />
{:else}
  <p>No stats yet</p>
{/if}
