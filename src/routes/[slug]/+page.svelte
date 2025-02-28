<!-- TODO: get long url -->
<script lang="ts">
  const { data } = $props();

</script>

{#if data.url}
  <p>{data.url}</p>
{/if}

{#if data.urlError}
  <p>{data.urlError}</p>
{/if}

<p>{data.slug}</p>
