<!-- TODO: get long url -->
<script lang="ts">
  export let data

</script>

{#if data.url}
  <p>{data.url}</p>
{/if}

<p>{data.slug}</p>
