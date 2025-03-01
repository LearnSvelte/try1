<script lang="ts">
  import type { PageProps } from './$types'
  import { enhance } from '$app/forms'
  import { page } from '$app/state'
  import RedirectPreview from '$lib/components/RedirectPreview.svelte'
  import { validateSlug, validateUrl } from '$lib/validation'

  let { form }: PageProps = $props()

  let url: string = $state('')
  let originUrl = $state(page.url.origin)
  let slug: string = $state('')
  let submitState: 'idle' | 'submitting' | 'success' | 'error' = $state('idle')
  let isValidationAllowed = $state(false)
  const takenSlugs: string[] = $state([])

  function addTakenSlug (slug: string) {
    if (takenSlugs.includes(slug)) return
    takenSlugs.push(slug)
  }

  const slugValidation = $derived(validateSlug(slug, takenSlugs))
  const urlValidation = $derived(validateUrl(url))

  async function handleSubmit (event: Event) {
    // eslint-disable-next-line no-console
    console.log('handleSubmit')
    event.preventDefault()
    isValidationAllowed = true

    if (!urlValidation.isValid || !slugValidation.isValid)
      return

    submitState = 'submitting'
  }
</script>

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
      // eslint-disable-next-line no-console
      console.log('result', result)

      if (result.type === 'failure') {
        submitState = 'error'
        isValidationAllowed = true
        const slug = result?.data?.slug
        if (typeof slug === 'string') addTakenSlug(slug)

        // eslint-disable-next-line no-console
        console.log('fail', slug, takenSlugs)
      }
      else {
        submitState = 'success'
        isValidationAllowed = false
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
        bind:value={originUrl}
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

    <p class="validationHelperGrid {slugValidation.isValid ? 'validationHelperGrid--hidden' : 'validationHelperGrid--shown'}">
      <small>{slugValidation.errorMessage}</small>
    </p>

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
        disabled={submitState === 'submitting'}
      >
        Submit
      </button>
    </div>
  {/if}
</form>

<style scoped>
  .validationHelperGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1em;
    justify-content: center;
    color: var(--pico-del-color);
    margin-top: calc(-0.5 * var(--pico-spacing));
    margin-bottom: calc(0.5 * var(--pico-spacing));
    /* height: 0; */
    transition: grid-template-rows 0.1s;
  }

  .validationHelperGrid--hidden {
    grid-template-rows: 0fr;
  }

  .validationHelperGrid--shown {
    /* height: auto; */
    grid-template-rows: 1fr;
  }

  .validationHelperGrid small {
    overflow: hidden;
    grid-column-start: 2;
  }

  /* .validationHelperGrid small {
    display: block;
  } */
</style>
