<script>
  let icons = ['⚔️', '🗡️', '🏹', '🔥', '🔪', '🪓', '✂️']
  let selectedIcon = icons[Math.floor(Math.random() * icons.length)]
</script>

<div>
  <header>
    <h1>URL shortener  {selectedIcon}</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/list">List</a>
      <a href="/kv">KV</a>
    </nav>
  </header>

  <slot />

  <footer>
    <p>© 2025</p>
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
