<template>
  <div class="main-wrap">
    <PetSidebar
      :active-filters="activeFilters"
      @toggle="toggleFilter"
      @clear="clearFilters"
    />

    <div class="content">
      <div class="content-header">
        <h2 class="content-heading">
          {{ activeFilters.length
            ? activeFilters.map(t => TAGS.find(x => x.id === t).label).join(' + ')
            : 'All Pets' }}
        </h2>
        <span class="content-count">{{ filteredPets.length }} available</span>
      </div>

      <div class="pet-grid">
        <PetCard
          v-for="(pet, i) in filteredPets"
          :key="pet.id"
          :pet="pet"
          :delay="i * 0.04"
          @click="$emit('open-modal', pet)"
        />

        <div class="empty-state" v-if="filteredPets.length === 0">
          <span class="e-icon">🐾</span>
          <p>No pets found</p>
          <small>Try removing a filter.</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TAGS, PETS } from '../data/pets.js'
import PetCard from '../components/PetCard.vue'
import PetSidebar from '../components/PetSidebar.vue'

defineEmits(['open-modal'])

const activeFilters = ref([])

function toggleFilter(id) {
  const i = activeFilters.value.indexOf(id)
  if (i === -1) activeFilters.value.push(id)
  else activeFilters.value.splice(i, 1)
}

function clearFilters() {
  activeFilters.value = []
}

const filteredPets = computed(() =>
  activeFilters.value.length
    ? PETS.filter(p => activeFilters.value.includes(p.tag))
    : PETS
)
</script>
