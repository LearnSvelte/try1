<script lang="ts">
  import StatsTable from '$lib/components/StatsTable.svelte'

  export let data

// console.log(data)
</script>

<!-- <p>{typeof data.stats}</p> -->
<!-- <p>{data.stats}</p> -->
<p>{data.url ?? 'url is missing'}</p>

<!-- <p>{data.stats}</p> -->

{#if data.stats}
  <StatsTable stats={data.stats} />
{:else}
  <p>No stats yet</p>
{/if}
