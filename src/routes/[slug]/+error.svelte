<script lang="ts">
  import { page } from '$app/state'

  const msg = page.error?.message
  if (msg) {
    console.error(msg)
  }
</script>

<p>Got an error.</p>
<p>Message: {msg}</p>
