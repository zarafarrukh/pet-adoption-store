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