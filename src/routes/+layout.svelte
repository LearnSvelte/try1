<script>
  import { onMount } from 'svelte'

  import '@picocss/pico/css/pico.classless.min.css'

  const icons = ['⚔️', '🗡️', '🏹', '🔥', '🔪', '🪓', '✂️']
  let selectedIcon = ''

  onMount(() => {
    selectedIcon = icons[Math.floor(Math.random() * icons.length)]
  })
</script>

<div>
  <header>
    <h1>URL shortener {selectedIcon}</h1>

    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/list">List</a></li>
      </ul>
      <ul>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <li><a href="#" data-theme-switcher="auto">Auto</a></li>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <li class="light"><a href="#" data-theme-switcher="light">Light</a></li>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <li class="dark"><a href="#" data-theme-switcher="dark">Dark</a></li>
      </ul>
    </nav>
  </header>

  <slot />

  <footer>
    <p>© 2025. 🍉</p>
  </footer>
</div>

<style>
:global(html[data-theme="dark"]) .dark,
:global(html[data-theme="light"]) .light {
  display: none;
}
</style>
