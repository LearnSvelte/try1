<script lang="ts">
  import { catchError } from '$lib/catchError'
  import { saveURL } from '$lib/saveURL'

  let url: string = ''
  let slug: string = ''
  let currentUrl = window.location.href

  async function handleSubmit(event: Event) {
    event.preventDefault()
    console.log('Long URL:', url)
    console.log('Short URL:', slug)

    const [err, data] = await catchError(saveURL({ url, slug }))
    console.log('Error:', err)
    console.log('Data:', data)
  }
</script>

<form on:submit={handleSubmit}>
  <input
    type="url"
    name="url"
    placeholder="URL"
    bind:value={url}
    required
    title="Please enter a valid URL starting with http:// or https://"
    autocomplete="off"
    style="text-align: center"
  />

  <!-- svelte-ignore a11y_no_redundant_roles -->
  <fieldset role="group">
    <input
      type="text"
      disabled
      bind:value={currentUrl}
      style="text-align: right"
    />
    <input
      type="text"
      name="slug"
      placeholder="slug"
      required
      pattern="[A-Za-z0-9_\-]+"
      autocomplete="off"
      title="Only letters, numbers, hyphens (-), and underscores (_) are allowed. No spaces."
      bind:value={slug}
    />
  </fieldset>
  <button type="submit">Submit</button>
</form>

<p>
  <a href="/{slug}">Go to short url</a>
</p>
<p>
  <a href="/{slug}/stats">Go to stats</a>
</p>
