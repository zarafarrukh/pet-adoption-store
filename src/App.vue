<template>
  <div id="app-layout">
    <nav :class="['nav', { 'nav--hidden': isHidden }]">
      <RouterLink to="/" class="nav-logo">
        <img src="/pawmatch-logo.png" alt="PawMatch Logo" class="nav-logo-img" />
        PawMatch
      </RouterLink>
      <div class="nav-links">
        <RouterLink to="/browse">Browse</RouterLink>
        <RouterLink to="/merch">Shop</RouterLink>
        <RouterLink to="/quiz">Pet Quiz</RouterLink>
        <RouterLink to="/browse" class="nav-cta">Adopt Now</RouterLink>
      </div>
    </nav>
    
    <RouterView @open-modal="openModal" />
    
    <footer>PawMatch 2026</footer>
    <PetModal v-if="selectedPet" :pet="selectedPet" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import PetModal from './components/PetModal.vue'

const selectedPet = ref(null)

// --- Smart Navbar Logic ---
const isHidden = ref(false)
let lastScrollPosition = 0

function onScroll() {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  
  // 1. Ignore negative scroll (common on Mac/iOS bounce)
  if (currentScrollPosition < 0) return

  // 2. Only trigger if the user scrolls more than 60px (threshold)
  if (Math.abs(currentScrollPosition - lastScrollPosition) < 60) return

  // 3. If current is greater than last, we are scrolling down -> Hide
  isHidden.value = currentScrollPosition > lastScrollPosition
  
  // 4. Update last position
  lastScrollPosition = currentScrollPosition
}

// Attach the listener when the page loads
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

// Clean up the listener if the component is destroyed
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

// --- Modal Functions ---
function openModal(pet) {
  selectedPet.value = pet
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedPet.value = null
  document.body.style.overflow = ''
}
</script>