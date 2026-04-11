<template>
  <div class="pet-card" :style="{ animationDelay: delay + 's' }" @click="$emit('open-modal', pet)">
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
import { useRouter } from 'vue-router'
import { TAGS } from '../data/pets.js'

const props = defineProps({
  pet: { type: Object, required: true },
  delay: { type: Number, default: 0 },
})

// Tell the parent (BrowsePets) we want to open the modal
defineEmits(['open-modal'])

const router = useRouter()

const tagEmoji = computed(() => TAGS.find(t => t.id === props.pet.tag)?.emoji ?? '')

// Navigation logic for the form
const goToAdoption = () => {
  router.push({ 
    path: '/adopt', 
    query: { petId: props.pet.id }
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
</style>