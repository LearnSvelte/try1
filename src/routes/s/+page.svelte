<script lang="ts">
  import type { PageProps } from './$types'
  import { validateSlug } from '$lib/validation/validateSlug'
  import { validateUrl } from '$lib/validation/validateUrl'

  let { form }: PageProps = $props()

  import { enhance } from '$app/forms'
  import { page } from '$app/state'
  import RedirectPreview from '$lib/components/RedirectPreview.svelte'

  // export let form: ActionData

  // let { form } = $props

  let url: string = $state('')
  // let submittedUrl: string = $state('')
  // let submittedSlug: string = $state('')
  let myUrl = $state(page.url.origin)
  let slug: string = $state('')
  // let error: string = $state('')
  // let isUrlValid = $state(false)
  // let isSlugValid: boolean = $state(false)
  const takenSlugs: string[] = $state([])
  let submitState: 'idle' | 'submitting' | 'success' | 'error' = $state('idle')

  let isValidationAllowed = $state(false)

  let validationState: 'idle' | 'validating' = $state('idle')

  const slugValidation = $derived(validateSlug(slug, takenSlugs))
  const urlValidation = $derived(validateUrl(url))

  async function handleSubmit (event: Event) {
    event.preventDefault()
    isValidationAllowed = true

    if (!urlValidation.isValid || !slugValidation.isValid)
      return

    submitState = 'submitting'
  }

// function resetFormData () {
  //   submitState = 'idle'
  //   validationState = 'idle'
  //   url = ''
  //   slug = ''
  // }
</script>

<p>validationState: {validationState}</p>
<p>takenSlugs: {takenSlugs}</p>
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
    return async ({ update, result }) => {
      await update({ invalidateAll: true })
      console.log('result', result)

      if (result.type === 'failure') {
        submitState = 'error'
        validationState = 'validating' // deprecated
        isValidationAllowed = true
        const slug = result?.data?.slug
        if (typeof slug === 'string') takenSlugs.push(slug)

        console.log('fail', slug, takenSlugs)
      }
      else {
        submitState = 'success'
        validationState = 'idle'
      }
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
      aria-invalid={isValidationAllowed ? !urlValidation.isValid : null}
      autocomplete="off"
      style="text-align: center"
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
      <!--         pattern="[A-Za-z0-9_\-]+" -->
      <input
        type="text"
        name="slug"
        placeholder="slug"
        required
        pattern="[A-Za-z0-9]+"
        autocomplete="off"
        title="Only letters, numbers are allowed."
        bind:value={slug}
        aria-invalid={isValidationAllowed ? !slugValidation.isValid : null}
        aria-describedby={isValidationAllowed && !slugValidation.isValid ? 'slugValidationDescription' : null}
        style="width: 50%"
      />

    </fieldset>

    <!-- {#if !slugValidation.isValid && validationState === 'validating'} -->
    {#if !slugValidation.isValid}
      <div style="display: flex; gap: 1em; justify-content: center; margin-top: calc(-1 * var(--pico-spacing))">
        <p style="width: 50%"></p>
        <p style="width: 50%">
          <small id="slugValidationDescription" style="color: var(--pico-del-color);">{slugValidation.errorMessage}</small>
        </p>
      </div>
    {/if}

    <!-- {#if slugValidationMessage}
      <div style="display: flex; gap: 1em; justify-content: center; margin-top: calc(-1 * var(--pico-spacing))">
        <p style="width: 50%"></p>
        <p style="width: 50%">
          <small id="invalid-helper" style="color: var(--pico-del-color);">{slugValidationMessage}</small>
        </p>
      </div>
    {/if} -->

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
