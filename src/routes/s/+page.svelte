<script lang="ts">
  import type { PageProps } from './$types'

  let { form }: PageProps = $props()

  import { enhance } from '$app/forms'
  import { page } from '$app/state'
  import RedirectPreview from '$lib/components/RedirectPreview.svelte'

  // export let form: ActionData

  // let { form } = $props

  let url: string = $state('')
  let submittedUrl: string = $state('')
  let submittedSlug: string = $state('')
  let myUrl = $state(page.url.origin)
  let slug: string = $state('')
  let error: string = $state('')
  let isUrlValid = $state(false)
  let isSlugValid: boolean = $state(false)
  const takenSlugs: string[] = []
  let submitState: 'idle' | 'validating' | 'submitting' | 'success' | 'error' = $state('idle')

  let validationState: 'idle' | 'validating' = $state('idle')

  function validateUrl () {
    try {
      const _url = new URL(url)
      isUrlValid = true
    }
    catch {
      isUrlValid = false
    }
  }

  function validateSlug (): void {
    // if (submitState === 'error')
    //   submitState = 'validating'
    if (validationState === 'idle') return

    if (takenSlugs.includes(slug)) {
      isSlugValid = false
      return
    }
    isSlugValid = /^[\w\-]+$/.test(slug)
  }

  function handleUrlInput () {
    if (validationState === 'idle') return
    validateUrl()
  }

  let isUrlMarkedInvalid = $derived(validationState === 'idle' ? null : !isUrlValid)
  let isSlugMarkedInvalid = $derived(validationState === 'idle' ? null : !isSlugValid)

  async function handleSubmit (event: Event) {
    event.preventDefault()
    validationState = 'validating'
    // submitState = 'validating'

    validateUrl()
    validateSlug()

    if (!isUrlValid || !isSlugValid)
      return

    submitState = 'submitting'
  // const [err, data] = await catchError(saveURL({ url, slug }))
    // if (err) {
    //   submitState = 'error'
    //   error = err.message
    //   if (err.message === SAVE_ERRORS.KEY_EXISTS) {
    //     takenSlugs.push(slug)
    //     slugIsValid = false
    //   }
    // }
    // else {
    //   submitState = 'success'
    // }
  }

  function resetFormData () {
    submitState = 'idle'
    validationState = 'idle'
    url = ''
    slug = ''
  }
</script>

<p>{JSON.stringify(form ?? {})}</p>

{#if form?.formState === 'success'}
  {#if form?.submittedUrl && form?.submittedSlug}
    <RedirectPreview slug={form.submittedSlug} longUrl={form.submittedUrl} />
  {/if}
  <form method="POST" action="?/resetForm">
    <button type="submit">Shorten another url</button>
  </form>
{/if}

<form
  method="POST"
  action="?/save"
  onsubmit={handleSubmit}
  use:enhance={() => {
    return async ({ update }) => {
      await update({ invalidateAll: true })
      submitState = 'success'
      validationState = 'idle'
    }
  }}
>
  {#if form?.formState === 'success'}

    {#if form?.submittedUrl && form?.submittedSlug}
      <RedirectPreview slug={form.submittedSlug} longUrl={form.submittedUrl} />
    {/if}

  {:else}
    <input
      type="url"
      name="url"
      placeholder="URL"
      bind:value={url}
      required
      title="Please enter a valid URL starting with http:// or https://"
      aria-invalid={isUrlMarkedInvalid}
      autocomplete="off"
      style="text-align: center"
      oninput={handleUrlInput}
    />

    <!-- svelte-ignore a11y_no_redundant_roles -->
    <fieldset role="group">
      <input
        type="text"
        bind:value={myUrl}
        disabled
        readonly
        style="text-align: right; width: 50%"
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
        aria-invalid={isSlugMarkedInvalid}
        style="width: 50%"
        oninput={validateSlug}
      />
    </fieldset>

    <div style="display: flex; gap: 1em; justify-content: center">
      <button
        type="reset"
        style="width: 50%"
      >
        Reset
      </button>

      <button
        type="submit"
        style="width: 50%"
      >
        Submit
      </button>
    </div>
  {/if}
</form>
