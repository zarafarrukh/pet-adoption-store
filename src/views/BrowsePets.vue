<template>
  <div class="main-wrap">
    <PetSidebar 
      :tags="TAGS" 
      :active-filters="activeFilters" 
      @toggle="toggleFilter"
      @clear="activeFilters = []"
    />

    <div class="content">
      <header class="content-header">
        <h2 class="content-heading">{{ filterLabel }}</h2>
        <span class="content-count">{{ filteredPets.length }} available</span>
      </header>

      <div class="pet-grid">
        <PetCard 
          v-for="(pet, i) in filteredPets" 
          :key="pet.id" 
          :pet="pet" 
          :index="i"
          @open="openPet"
        />
      </div>
    </div>

    <PetModal 
      v-if="selectedPet" 
      :pet="selectedPet" 
      @close="closePet"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PETS, TAGS } from '../data/pets';
import PetSidebar from '../components/PetSidebar.vue';
import PetCard from '../components/PetCard.vue';
import PetModal from '../components/PetModal.vue';

const activeFilters = ref([]);
const selectedPet = ref(null);

const filteredPets = computed(() => {
  if (!activeFilters.value.length) return PETS;
  return PETS.filter(p => activeFilters.value.includes(p.tag));
});

const filterLabel = computed(() => {
  return activeFilters.value.length ? activeFilters.value.join(' + ') : 'All Pets';
});

const toggleFilter = (id) => {
  const i = activeFilters.value.indexOf(id);
  i === -1 ? activeFilters.value.push(id) : activeFilters.value.splice(i, 1);
};

const openPet = (pet) => {
  selectedPet.value = pet;
  document.body.style.overflow = 'hidden';
};

const closePet = () => {
  selectedPet.value = null;
  document.body.style.overflow = '';
};
</script>

<style scoped>
.main-wrap { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
.content { padding: 40px; }
.content-header { display: flex; justify-content: space-between; border-bottom: 2px solid #111; margin-bottom: 30px; padding-bottom: 10px; }
.pet-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
</style>