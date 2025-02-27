<script lang="ts">
  import { page } from '$app/state'

  import { catchError } from '$lib/catchError'
  import { saveURL } from '$lib/saveURL'

  let url: string = ''
  let slug: string = ''
  let error: string = ''
  let submitState: 'idle' | 'submitting' | 'success' | 'error' = 'idle'

  async function handleSubmit (event: Event) {
    event.preventDefault()
    console.log('Long URL:', url)
    console.log('Short URL:', slug)

    submitState = 'submitting'
    const [err, data] = await catchError(saveURL({ url, slug }))
    if (err) {
      submitState = 'error'
      console.log('Error @:', err)
      console.log('Error @2:', err.message)
      error = err.message
    }
    else {
      submitState = 'success'
    }
    console.log('Error:', err)
    console.log('Data:', data)
  }

  function handleReset () {
    submitState = 'idle'
  }
</script>

<p>{submitState}</p>

<form
  on:submit={handleSubmit}
  on:reset={handleReset}
>
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
      bind:value={page.url}
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
  <button
    type="submit"
    disabled={submitState !== 'idle'}
  >
    Submit
  </button>

  <button
    type="reset"
  >
    Reset
  </button>
</form>

{#if submitState === 'error'}
  <p>
    {error}
  </p>
{/if}

{#if submitState === 'success'}
  <p>
    <a href="/{slug}">Go to short url</a>
  </p>
  <p>
    <a href="/{slug}/stats">Go to stats</a>
  </p>
{/if}
