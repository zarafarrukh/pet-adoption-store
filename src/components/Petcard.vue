<template>
  <div class="pet-card" :style="{ animationDelay: delay + 's' }" @click="$emit('click', pet)">
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
      <button class="adopt-btn" @click.stop="$emit('click', pet)">
        View {{ pet.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TAGS } from '../data/pets.js'

const props = defineProps({
  pet: { type: Object, required: true },
  delay: { type: Number, default: 0 },
})

defineEmits(['click'])

const tagEmoji = computed(() => TAGS.find(t => t.id === props.pet.tag)?.emoji ?? '')

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>