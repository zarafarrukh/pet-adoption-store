<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">✕</button>

      <!-- Top: image + info -->
      <div class="modal-top">
        <div class="modal-img-wrap">
          <img :src="pet.image" :alt="pet.name" />
        </div>
        <div class="modal-info">
          <span class="modal-tag">{{ tagEmoji }} {{ capitalize(pet.tag) }}</span>
          <div class="modal-name">{{ pet.name }}</div>
          <div class="modal-breed">{{ pet.breed }}</div>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Age</div>
              <div class="info-value">{{ pet.age }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Vaccinated</div>
              <div class="info-value">{{ pet.vaccinated }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Location</div>
              <div class="info-value">{{ pet.location }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Temperament</div>
              <div class="info-value">{{ pet.temperament }}</div>
            </div>
          </div>
        
          <!-- Option to start adding adoption fees if we want -->
          <!-- <div class="modal-fee">
            <span class="modal-fee-label">Adoption Fee</span>
            <span class="modal-fee-amount">{{ pet.fee }}</span>
          </div> -->

          <div class="modal-action-row">
            <button class="btn-adopt">Adopt {{ pet.name }}</button>
            <button class="btn-live" @click="toggleCam">
              <span class="live-dot" v-if="!showCam"></span>
              {{ showCam ? '✕ Close Cam' : 'Live Footage' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Detail strips -->
      <div class="modal-bottom">
        <div class="detail-strip">
          <div class="detail-strip-label">Personality</div>
          <div class="detail-strip-value">{{ pet.personality }}</div>
        </div>
        <div class="detail-strip">
          <div class="detail-strip-label">Diet & Care</div>
          <div class="detail-strip-value">{{ pet.diet }}</div>
        </div>
        <div class="detail-strip">
          <div class="detail-strip-label">Shelter</div>
          <div class="detail-strip-value">{{ pet.shelter }}</div>
        </div>
      </div>

      <!-- Live cam panel -->
      <div class="cam-panel" v-if="showCam">
        <div class="cam-header">
          <span class="cam-live-badge"><span class="live-dot"></span> Live</span>
          <span class="cam-title">{{ pet.name }}'s Enclosure — Shelter Cam</span>
          <button class="cam-close-btn" @click="showCam = false">✕ Close</button>
        </div>
        <div class="cam-body">
          <iframe
            :src="`https://www.youtube.com/embed/${pet.camId}?autoplay=1&mute=1&loop=1&playlist=${pet.camId}&controls=0&modestbranding=1`"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TAGS } from '../data/pets.js'

const props = defineProps({
  pet: { type: Object, required: true },
})

defineEmits(['close'])

const showCam = ref(false)

const tagEmoji = computed(() => TAGS.find(t => t.id === props.pet.tag)?.emoji ?? '')

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function toggleCam() {
  showCam.value = !showCam.value
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 999;
  background: rgba(0, 0, 0, 0.65);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  animation: fadeOverlay 0.2s ease;
}

.modal {
  background: var(--white);
  border: 2px solid var(--black);
  width: 100%; max-width: 860px;
  max-height: 90vh; overflow-y: auto;
  position: relative;
  animation: slideUp 0.25s cubic-bezier(.22, 1, .36, 1);
}

.modal-close {
  position: absolute; top: 16px; right: 16px; z-index: 10;
  width: 36px; height: 36px;
  background: var(--black); color: var(--yellow);
  border: none; cursor: pointer;
  font-size: 1.1rem; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.15s;
}
.modal-close:hover { opacity: 0.7; }

.modal-top { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 2px solid var(--black); }
.modal-img-wrap { aspect-ratio: 1; overflow: hidden; border-right: 2px solid var(--black); }
.modal-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }

.modal-info { padding: 32px 28px; display: flex; flex-direction: column; }
.modal-tag {
  display: inline-block; background: var(--yellow);
  border: 1.5px solid var(--black);
  font-size: 0.68rem; font-weight: 800; letter-spacing: 1.8px; text-transform: uppercase;
  padding: 4px 12px; margin-bottom: 12px; align-self: flex-start;
}
.modal-name { font-size: 2.6rem; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; line-height: 1; margin-bottom: 6px; }
.modal-breed { font-size: 0.9rem; font-weight: 600; color: var(--gray-400); letter-spacing: 0.5px; margin-bottom: 24px; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 20px; margin-bottom: 24px; }
.info-label { font-size: 0.65rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--gray-400); margin-bottom: 3px; }
.info-value { font-size: 0.9rem; font-weight: 700; }

.modal-fee {
  background: var(--yellow); border: 1.5px solid var(--black);
  padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px;
}
.modal-fee-label { font-size: 0.72rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
.modal-fee-amount { font-size: 1.4rem; font-weight: 900; }

.modal-action-row { display: flex; gap: 10px; }
.btn-adopt {
  flex: 1; padding: 13px; background: var(--black); color: var(--yellow);
  border: 1.5px solid var(--black); font-family: 'Barlow', sans-serif;
  font-weight: 800; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;
  cursor: pointer; transition: background 0.15s, color 0.15s;
}
.btn-adopt:hover { background: var(--yellow); color: var(--black); }
.btn-live {
  flex: 1; padding: 13px; background: var(--white); color: var(--black);
  border: 1.5px solid var(--black); font-family: 'Barlow', sans-serif;
  font-weight: 800; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;
  cursor: pointer; transition: background 0.15s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-live:hover { background: var(--gray-100); }

.live-dot { width: 8px; height: 8px; background: #e63946; border-radius: 50%; animation: pulse 1.2s ease-in-out infinite; flex-shrink: 0; }

.modal-bottom { padding: 28px; display: flex; flex-direction: column; }
.detail-strip {
  border-bottom: 1px solid var(--gray-200); padding: 16px 0;
  display: grid; grid-template-columns: 160px 1fr; gap: 16px; align-items: start;
}
.detail-strip:last-child { border-bottom: none; }
.detail-strip-label { font-size: 0.72rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--gray-400); padding-top: 2px; }
.detail-strip-value { font-size: 0.9rem; font-weight: 600; line-height: 1.5; }

.cam-panel { border-top: 2px solid var(--black); animation: fadeUp 0.3s ease; }
.cam-header {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 20px; border-bottom: 1.5px solid var(--black);
  background: var(--black);
}
.cam-title { font-size: 0.8rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--yellow); }
.cam-live-badge {
  background: #e63946; color: #fff;
  font-size: 0.65rem; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 3px 9px; border-radius: 2px;
  display: flex; align-items: center; gap: 5px;
}
.cam-close-btn {
  margin-left: auto; background: none; border: 1px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.6); font-family: 'Barlow', sans-serif;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  padding: 5px 12px; cursor: pointer; transition: border-color 0.15s;
}
.cam-close-btn:hover { border-color: var(--yellow); color: var(--yellow); }
.cam-body { position: relative; width: 100%; aspect-ratio: 16/9; background: #000; }
.cam-body iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }

@media (max-width: 860px) {
  .modal-top { grid-template-columns: 1fr; }
  .modal-img-wrap { border-right: none; border-bottom: 2px solid var(--black); aspect-ratio: 4/3; }
  .modal-name { font-size: 2rem; }
  .detail-strip { grid-template-columns: 1fr; gap: 4px; }
}
</style>
