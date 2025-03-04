<script lang="ts">
  import { enhance } from '$app/forms'
  import { page } from '$app/state'
  import { validateSlug } from '$lib/entities/slug'
  import { validateUrl } from '$lib/entities/url'
  import { RedirectPreview } from '$lib/widgets/redirectPreview'

  let { form } = $props()

  let url: string = $state('')
  let originUrl = $state(page.url.origin)
  let slug: string = $state('')
  let localState: 'idle' | 'submitting' | 'success' | 'error' | 'resetted' = $state('idle')
  let isValidationAllowed = $state(false)
  const takenSlugs: string[] = $state([])

  function addTakenSlug (slug: string) {
    if (takenSlugs.includes(slug)) return
    takenSlugs.push(slug)
  }

  const slugValidation = $derived(validateSlug(slug, takenSlugs))
  const urlValidation = $derived(validateUrl(url))
  const doNotShowInputError = $derived(form?.exists && isValidationAllowed)

  async function handleSubmit (event: Event) {
    event.preventDefault()
    isValidationAllowed = true

    if (!urlValidation.isValid || !slugValidation.isValid)
      return

    localState = 'submitting'
  }

  function handleReset () {
    localState = 'resetted'
    isValidationAllowed = false
  }
</script>

{#if form?.formState === 'success'}
  {#if form?.submittedUrl && form?.submittedSlug}
    <RedirectPreview slug={form.submittedSlug.toString()} longUrl={form.submittedUrl.toString()} />
  {/if}
  <form method="POST" action="?/resetForm">
    <button type="submit">Shorten another url</button>
  </form>
{/if}

<form
  method="POST"
  action="?/save"
  onsubmit={handleSubmit}
  onreset={handleReset}
  use:enhance={() => {
    return async ({ update, result }) => {
      await update({ invalidateAll: true })

      if (result.type === 'failure') {
        localState = 'error'
        isValidationAllowed = true
        const slug = result?.data?.submittedSlug
        if (typeof slug === 'string') addTakenSlug(slug)
      }
      else {
        localState = 'success'
        isValidationAllowed = false
      }
    }
  }}
>
  {#if form?.formState !== 'success'}
    {#if form?.formState === 'error' && !doNotShowInputError && localState !== 'resetted'}
      <p class="formError">{form?.errorMessage}</p>
    {/if}

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
    <fieldset role="group" class="inputsRow">
      <input
        type="text"
        bind:value={originUrl}
        disabled
        readonly
        style="text-align: right; width: 50%"
      />
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

    <p class="validationHelperGrid {isValidationAllowed && !slugValidation.isValid ? 'validationHelperGrid--shown' : 'validationHelperGrid--hidden'}">
      <small>{slugValidation.errorMessage}</small>
    </p>

    <div class="buttonsRow">
      <button
        type="reset"
      >
        Reset
      </button>

      <button
        type="submit"
        aria-busy={localState === 'submitting'}
        disabled={isValidationAllowed && (!urlValidation.isValid || !slugValidation.isValid)}
      >
        Submit
      </button>
    </div>
  {/if}
</form>

<style>
  .validationHelperGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1em;
    justify-content: center;
    color: var(--pico-del-color);
    margin-top: calc(-0.5 * var(--pico-spacing));
    margin-bottom: calc(0.5 * var(--pico-spacing));
    transition: grid-template-rows 0.1s;

    small {
      overflow: hidden;
      grid-column-start: 2;
    }
  }

  .validationHelperGrid--hidden {
    grid-template-rows: 0fr;
  }

  .validationHelperGrid--shown {
    grid-template-rows: 1fr;
  }

  .formError {
    color: var(--pico-del-color);
  }

  .inputsRow {
    input {
      width: 50%;
    }
  }
  .buttonsRow {
    display: flex;
    gap: 1em;
    justify-content: center;

    button {
      width: 50%;
    }
  }

</style>
