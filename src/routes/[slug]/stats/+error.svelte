<script lang="ts">
  import { page } from '$app/state'

  const msg = page.error?.message
  if (msg) {
    console.error(msg)
  }

</script>

<h1 data-d>{page.status} {page.error?.message}</h1>
