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

<style scoped>
.pet-card {
  border: 1px solid var(--black);
  margin: -0.5px;
  cursor: pointer;
  position: relative;
  background: var(--white);
  animation: fadeUp 0.35s ease both;
  transition: box-shadow 0.2s;
}
.pet-card:hover { z-index: 2; box-shadow: 4px 4px 0 var(--black); }
.pet-card:hover .card-img img { transform: scale(1.06); }

.card-img {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--gray-100);
  border-bottom: 1.5px solid var(--black);
}
.card-img img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.45s;
}
.card-tag {
  position: absolute; top: 0; left: 0;
  background: var(--yellow);
  border-bottom: 1.5px solid var(--black);
  border-right: 1.5px solid var(--black);
  font-size: 0.67rem; font-weight: 800;
  letter-spacing: 1.5px; text-transform: uppercase;
  padding: 5px 10px; color: var(--black);
}

.card-body { padding: 14px 16px 16px; }
.card-name { font-size: 1.4rem; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; line-height: 1; margin-bottom: 4px; }
.card-meta { font-size: 0.78rem; font-weight: 600; color: var(--gray-400); margin-bottom: 13px; display: flex; align-items: center; gap: 6px; }
.card-meta .sep { color: var(--gray-200); }

.adopt-btn {
  width: 100%; padding: 10px;
  background: var(--black); color: var(--yellow);
  border: 1.5px solid var(--black);
  font-family: 'Barlow', sans-serif; font-weight: 800;
  font-size: 0.76rem; letter-spacing: 2px; text-transform: uppercase;
  cursor: pointer; transition: background 0.15s, color 0.15s;
}
.adopt-btn:hover { background: var(--yellow); color: var(--black); }
</style>
