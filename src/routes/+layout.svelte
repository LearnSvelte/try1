<script>
  // export let data;
</script>

<main>
  <header>
    <h1>URL shortener</h1>
    <nav>
      <a href="/">Головна</a>
      <a href="/about">Про нас</a>
    </nav>
  </header>

  <slot />

  <footer>
    <p>© 2025</p>
  </footer>
</main>

<style>
  nav {
    display: flex;
    gap: 1em;
    justify-content: flex-start;
    margin-bottom: 1em;
  }
</style>
