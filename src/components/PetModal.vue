<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">✕</button>
      <div class="modal-top">
        <div class="modal-img-wrap"><img :src="pet.image" :alt="pet.name"/></div>
        <div class="modal-info">
          <span class="modal-tag">{{ pet.tag }}</span>
          <div class="modal-name">{{ pet.name }}</div>
          <div class="info-grid">
            <div class="info-item"><div class="info-label">Age</div><div>{{ pet.age }}</div></div>
            <div class="info-item"><div class="info-label">Location</div><div>{{ pet.location }}</div></div>
          </div>
          <div class="modal-action-row">
            <button class="btn-adopt">Adopt {{ pet.name }}</button>
            <button class="btn-live" @click="showCam = !showCam">
              {{ showCam ? '✕ Close Cam' : 'Live Footage' }}
            </button>
          </div>
        </div>
      </div>

      <div class="cam-panel" v-if="showCam">
        <div class="cam-body">
          <iframe 
            :src="`https://www.youtube.com/embed/${pet.camId}?autoplay=1&mute=1`" 
            allow="autoplay; encrypted-media" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps(['pet']);
defineEmits(['close']);
const showCam = ref(false);
</script>

<style scoped>
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border: 2px solid #111; width: 90%; max-width: 800px; position: relative; }
.modal-top { display: grid; grid-template-columns: 1fr 1fr; }
.modal-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.modal-info { padding: 30px; }
.btn-adopt { background: #111; color: #F9E000; padding: 12px; font-weight: 800; border: none; flex: 1; cursor: pointer; }
.btn-live { border: 1.5px solid #111; padding: 12px; font-weight: 800; flex: 1; cursor: pointer; }
.cam-body { aspect-ratio: 16/9; background: #000; }
.cam-body iframe { width: 100%; height: 100%; border: none; }
</style>