<script lang="ts">
  import StatsTable from '$lib/components/StatsTable.svelte'
  import { page } from '$app/state'

  const { data } = $props();

  const pageUrl = page.url
  // let redirectUrl = page.url.split('/').slice(0, -1).join('/');

  // let redirectUrl = $derived(page.url, (u) => {
  //   return u.split('/').slice(0, -1).join('/');
  // });

  let shortUrl = $derived(pageUrl.toString().split('/').slice(0, -1).join('/'));
</script>

<!-- <p>{pageUrl}</p> -->
<p>
  <a href={shortUrl}>{shortUrl}</a> 👉
  {data.url ?? 'url is missing'}</p>

{#if data.stats}
  <p>Total redirects: {data.stats.length}</p>
  <StatsTable stats={data.stats} />
{:else}
  <p>No stats yet</p>
{/if}
