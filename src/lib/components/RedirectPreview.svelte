<script lang="ts">
  import { page } from '$app/state'

  let { slug, longUrl } = $props()

  let shortUrl = $derived(`${page.url.origin}/${slug}`)
</script>

<p>
  <a href={shortUrl}>{shortUrl}</a> 👉
  {longUrl ?? 'url is missing'}
</p>

<!--
  const pageUrl = page.url

  let shortUrl = $derived(pageUrl.toString().split('/').slice(0, -1).join('/'))
-->
