<script lang="ts">
  import RedirectPreview from '$lib/components/RedirectPreview.svelte'
  import StatsTable from '$lib/components/StatsTable.svelte'

  const { data } = $props()
</script>

<p>{JSON.stringify(data)}</p>

<RedirectPreview slug={data.slug} longUrl={data.url} />

{#if data.stats}
  <p>Total redirects: {data.stats.length}</p>
  <StatsTable stats={data.stats} />
{:else}
  <p>No stats yet</p>
{/if}
