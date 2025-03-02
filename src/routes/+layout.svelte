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
    <h1>URL shortener2 {selectedIcon}</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/list">List</a>
    </nav>
  </header>

  <slot />

  <footer>
    <p>© 2025. 🍉</p>
  </footer>
</div>

<style>
  nav {
    display: flex;
    gap: 1em;
    justify-content: flex-start;
    margin-bottom: 1em;
  }
</style>
