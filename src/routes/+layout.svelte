<script>
// export let data;
</script>

<div>
  <header>
    <h1>URL shortener</h1>
    <nav>
      <a href="/">Shortener</a>
      <a href="/list">List</a>
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
