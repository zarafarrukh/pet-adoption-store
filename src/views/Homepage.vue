<template>
  <div class="home">
    <h1>🐾 Welcome to PawMatch</h1>
    <div class="links">
      <RouterLink to="/browse">Browse Pets</RouterLink>
      <RouterLink to="/merch">Paw-tique Shop</RouterLink>
      <RouterLink to="/quiz">Pet Quiz</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home { text-align: center; padding: 100px 40px; }
.links { display: flex; gap: 20px; justify-content: center; margin-top: 40px; }
.links a { background: var(--yellow); padding: 12px 24px; border: 1.5px solid #111; text-decoration: none; color: #111; font-weight: 800; }
</style>