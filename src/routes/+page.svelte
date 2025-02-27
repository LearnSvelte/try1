<script lang="ts">
  import { page } from '$app/state'

  import { catchError } from '$lib/catchError'
  import { saveURL } from '$lib/saveURL'

  let url: string = $state('')
  let myUrl = $state(page.url)
  let slug: string = $state('')
  let error: string = $state('')
  let submitState: 'idle' | 'validating' | 'submitting' | 'success' | 'error' = $state('idle')
  let urlIsValid = $state(false)
  let slugIsValid = $state(false)

  function validateUrl () {
    try {
      const _newUrl = new URL(url)
      urlIsValid = true
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (_err: unknown) {
      urlIsValid = false
    }
  }

  function validateSlug (): void {
    if (submitState === 'error')
      submitState = 'validating'
    slugIsValid = /^[\w\-]+$/.test(slug)
  }

  async function handleSubmit (event: Event) {
    console.log('Submitting form...')
    submitState = 'validating'
    event.preventDefault()

    validateUrl()
    validateSlug()

    if (!urlIsValid || !slugIsValid)
      return

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

  function handleReset (event: Event) {
    submitState = 'idle'

    setTimeout(() => {
      myUrl = page.url
    })
  }

  function handleUrlInput (event: Event) {
    console.log('URL changed:', url)
    if (submitState === 'idle')
      return
    validateUrl()
  }

  function getIsUrlValid () {
    if (submitState === 'idle')
      return null
    return urlIsValid ? 'false' : 'true'
  }

  function getIsSlugValid () {
    if (submitState === 'idle')
      return null
    return slugIsValid ? 'false' : 'true'
  }

  function getIsSubmitDisabled () {
    if (submitState === 'validating' && urlIsValid && slugIsValid)
      return false
    return submitState !== 'idle'
  }
</script>

<p>{submitState}</p>

<form
  onsubmit={handleSubmit}
  onreset={handleReset}
>
  <input
    type="url"
    name="url"
    placeholder="URL"
    bind:value={url}
    required
    title="Please enter a valid URL starting with http:// or https://"
    autocomplete="off"
    aria-invalid={getIsUrlValid()}
    style="text-align: center"
    oninput={handleUrlInput}
  />

  <!-- svelte-ignore a11y_no_redundant_roles -->
  <fieldset role="group">
    <input
      type="text"
      bind:value={myUrl}
      readonly
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
      aria-invalid={getIsSlugValid()}
      oninput={validateSlug}
    />
  </fieldset>

  <fieldset role="group">
    <button
      type="reset"
      disabled={url === '' && slug === ''}
    >
      Reset
    </button>
    <button
      type="submit"
      disabled={getIsSubmitDisabled()}
      onclick={handleSubmit}
    >
      Submit
    </button>
  </fieldset>

</form>

{#if submitState === 'error'}
  <p>
    {error}
  </p>
{/if}

{#if submitState === 'success'}
  <p>
    <a href="/{slug}">Go to short url</a>
    <a href="/{slug}/stats">Go to stats</a>
  </p>
{/if}
