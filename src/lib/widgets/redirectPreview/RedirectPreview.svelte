<script lang="ts">
  import { page } from '$app/state'

  type Props = {
    slug: string
    longUrl: string
  }

  let { slug, longUrl }: Props = $props()

  let shortUrl = $derived(`${page.url.origin}/${slug}`)
</script>

<p>
  <a href={shortUrl}>{shortUrl}</a> 👉
  {longUrl}
</p>
