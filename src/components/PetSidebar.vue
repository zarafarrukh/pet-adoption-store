<template>
  <aside class="sidebar">
    <div class="sidebar-title">Filter by type</div>
    <ul class="filter-list">
      <li
        v-for="tag in tags"
        :key="tag.id"
        class="filter-item"
        :class="{ active: activeFilters.includes(tag.id) }"
        @click="$emit('toggle', tag.id)"
      >
        <span class="fcheck"><span class="fcheck-dot"></span></span>
        <span class="filter-emoji">{{ tag.emoji }}</span>
        <span class="filter-label">{{ tag.label }}</span>
        <span class="filter-count">{{ countByTag(tag.id) }}</span>
      </li>
    </ul>
    <button class="clear-btn" v-if="activeFilters.length" @click="$emit('clear')">
      ✕ Clear all
    </button>

    <div class="sidebar-promo">
      <span class="sidebar-promo-icon">🏡</span>
      <div class="sidebar-promo-title">All pets vetted</div>
      <div class="sidebar-promo-text">Health-checked, vaccinated & ready to meet you.</div>
    </div>
  </aside>
</template>

<script setup>
import { TAGS, PETS } from '../data/pets.js'

defineProps({
  activeFilters: { type: Array, required: true },
})

defineEmits(['toggle', 'clear'])

const tags = TAGS

function countByTag(id) {
  return PETS.filter(p => p.tag === id).length
}
</script>