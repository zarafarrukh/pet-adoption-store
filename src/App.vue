<template>
  <div id="app-layout">
    <nav class="nav">
      <div class="nav-logo">🐾 PawMatch</div>
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

<style>
:root { --yellow: #F9E000; --black: #111111; }
body { font-family: 'Barlow', sans-serif; margin: 0; }
.nav { height: 64px; border-bottom: 1.5px solid #111; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; position: sticky; top: 0; background: #fff; z-index: 100; }
.nav-logo { font-weight: 900; text-transform: uppercase; }
.nav-cta { background: var(--yellow); padding: 8px 16px; border: 1.5px solid #111; text-decoration: none; color: #111; font-weight: 800; }
footer { background: #111; color: var(--yellow); text-align: center; padding: 20px; font-weight: 800; }
</style>