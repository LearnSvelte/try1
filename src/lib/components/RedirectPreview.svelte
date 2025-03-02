<script lang="ts">
  import { page } from '$app/state'

  let { slug, longUrl } = $props()

  let shortUrl = $derived(`${page.url.origin}/${slug}`)
</script>

<p>
  <a href={shortUrl}>{shortUrl}</a> 👉
  {longUrl ?? 'url is missing'}
</p>
