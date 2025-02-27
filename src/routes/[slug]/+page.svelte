<!-- TODO: get long url -->
<script lang="ts">
  export let data

// import { page } from '$app/state'
  // // export let data;

  // import { getURLBySlug } from '$lib/getURLBySlug'

  // const slug = $derived(page.params.slug)
  // // const slug = $derived(data.slug)

  // let url = $state('')

  // $effect(() => {
  //   if (slug) {
  //     getURLBySlug(slug).then((result) => {
  //       url = result ?? ''
  //     })
  //   }
  // })
</script>

<p>{data.slug}</p>
<!-- {#if url}
  <a href={url}>Link to {slug}</a>
{:else}
  <p>Loading link...</p>
{/if} -->
