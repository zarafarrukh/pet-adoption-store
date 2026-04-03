<template>
  <div class="pet-card" :style="{ animationDelay: (index * 0.04) + 's' }" @click="$emit('open', pet)">
    <div class="card-img">
      <img :src="pet.image" :alt="pet.name" loading="lazy"/>
      <span class="card-tag">{{ pet.tag }}</span>
    </div>
    <div class="card-body">
      <div class="card-name">{{ pet.name }}</div>
      <div class="card-meta">
        <span>{{ pet.age }}</span>
        <span class="sep">·</span>
        <span>{{ pet.breed }}</span>
      </div>
      <button class="adopt-btn">View {{ pet.name }}</button>
    </div>
  </div>
</template>

<script setup>
defineProps(['pet', 'index']);
defineEmits(['open']);
</script>

<style scoped>
.pet-card { border: 1px solid #111; margin: -0.5px; cursor: pointer; background: #fff; transition: box-shadow 0.2s; }
.pet-card:hover { z-index: 2; box-shadow: 4px 4px 0 #111; }
.card-img { aspect-ratio: 1; overflow: hidden; position: relative; border-bottom: 1.5px solid #111; }
.card-img img { width: 100%; height: 100%; object-fit: cover; }
.card-tag { position: absolute; top: 0; left: 0; background: #F9E000; border-bottom: 1.5px solid #111; border-right: 1.5px solid #111; padding: 5px 10px; font-size: 0.67rem; font-weight: 800; }
.card-body { padding: 14px 16px 16px; }
.card-name { font-size: 1.4rem; font-weight: 900; text-transform: uppercase; }
.adopt-btn { width: 100%; padding: 10px; background: #111; color: #F9E000; font-weight: 800; text-transform: uppercase; border: none; cursor: pointer; }
</style>