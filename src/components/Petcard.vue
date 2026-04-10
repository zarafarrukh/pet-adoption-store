<template>
  <div class="pet-card" :style="{ animationDelay: delay + 's' }" @click="goToAdoption">
    <div class="card-img">
      <img :src="pet.image" :alt="pet.name" loading="lazy" />
      <span class="card-tag">{{ tagEmoji }} {{ capitalize(pet.tag) }}</span>
    </div>
    <div class="card-body">
      <div class="card-name">{{ pet.name }}</div>
      <div class="card-meta">
        <span>{{ pet.age }}</span>
        <span class="sep">·</span>
        <span>{{ pet.breed }}</span>
      </div>
      <button class="adopt-btn" @click.stop="goToAdoption">
        Adopt {{ pet.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router' // Added router import to handle navigation
import { TAGS } from '../data/pets.js'

const props = defineProps({
  pet: { type: Object, required: true },
  delay: { type: Number, default: 0 },
})

const router = useRouter()

const tagEmoji = computed(() => TAGS.find(t => t.id === props.pet.tag)?.emoji ?? '')

// Function to handle navigation to the Adoption Form
const goToAdoption = () => {
  router.push({ 
    path: '/adopt', 
    query: { petId: props.pet.id } // Passes the ID to the form
  })
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>

<style scoped>
.pet-card {
  position: relative;
  cursor: pointer;
}
/* You can add more styles here if needed */
</style>