<script lang="ts">
  let longUrl: string = ''
  let shortUrl: string = ''
  let currentUrl = window.location.href

  function handleSubmit(event: Event) {
    event.preventDefault()
    console.log('Long URL:', longUrl)
    console.log('Short URL:', shortUrl)
  }
</script>

<form on:submit={handleSubmit}>
  <input
    type="text"
    name="longurl"
    placeholder="Long URL"
    bind:value={longUrl}
    required
    title="Please enter a valid URL starting with http:// or https://"
    data-pattern="https?://.+"
    pattern="https?://.*\.[a-z]+"
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
      name="shorturl"
      placeholder="Short URL"
      required
      pattern="[A-Za-z0-9_\-]+"
      autocomplete="off"
      title="Only letters, numbers, hyphens (-), and underscores (_) are allowed. No spaces."
      bind:value={shortUrl}
    />
  </fieldset>
  <button type="submit">Submit</button>
</form>

<p>
  <a href="/{shortUrl}">Go to short url</a>
</p>
<p>
  <a href="/{shortUrl}/stats">Go to stats</a>
</p>
