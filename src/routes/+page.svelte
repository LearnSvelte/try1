<script lang="ts">
  let longUrl: string = ''
  let shortUrl: string = ''

  function handleSubmit(event: Event) {
    event.preventDefault()
    console.log('Long URL:', longUrl)
    console.log('Short URL:', shortUrl)
  // Later you would use your model here to save the URL mapping
  }
</script>

<form on:submit={handleSubmit}>
  <input type="text" name="longurl" placeholder="Long URL" bind:value={longUrl} />
  <input type="text" name="shorturl" placeholder="Short URL" bind:value={shortUrl} />
  <button type="submit">Submit</button>
</form>

<p>
  <a href="/{shortUrl}">Go to short url</a>
</p>
<p>
  <a href="/{shortUrl}/stats">Go to stats</a>
</p>
