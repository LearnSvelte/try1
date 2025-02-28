<script lang="ts">
  import StatsTable from '$lib/components/StatsTable.svelte'

  export let data
</script>

<!-- <p>{typeof data.stats}</p> -->
<!-- <p>{data.stats}</p> -->

<StatsTable stats={data.stats} />
