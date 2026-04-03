<template>
  <div id="app-layout">
    <nav class="nav">
      <RouterLink to="/" class="nav-logo">🐾 PawMatch</RouterLink>
      <div class="nav-links">
        <RouterLink to="/browse">Browse</RouterLink>
        <RouterLink to="/merch">Shop</RouterLink>
        <RouterLink to="/quiz">Pet Quiz</RouterLink>
        <RouterLink to="/browse" class="nav-cta">Adopt Now</RouterLink>
      </div>
    </nav>

    <RouterView />

    <footer>🐾 PawMatch 2026</footer>
  </div>
</template>