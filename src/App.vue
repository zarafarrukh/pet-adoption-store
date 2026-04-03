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
    <RouterView @open-modal="openModal" />
    <footer>🐾 PawMatch 2026</footer>
    <PetModal v-if="selectedPet" :pet="selectedPet" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PetModal from './components/PetModal.vue'

const selectedPet = ref(null)

function openModal(pet) {
  selectedPet.value = pet
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedPet.value = null
  document.body.style.overflow = ''
}
</script>