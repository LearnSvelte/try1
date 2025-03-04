<script lang="ts">
  import { StatsTable } from '$lib/entities/stat'

  import { RedirectPreview } from '$lib/widgets/redirectPreview'

  const { data } = $props()
</script>

<RedirectPreview slug={data.slug} longUrl={data.url} />

{#if data.stats}
  <p>Total redirects: {data.stats.length}</p>
  <StatsTable stats={data.stats} />
{:else}
  <p>No stats yet</p>
{/if}
