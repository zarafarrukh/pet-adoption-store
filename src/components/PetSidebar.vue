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

<style scoped>
.sidebar {
  border-right: 1.5px solid var(--black);
  padding: 36px 28px;
  position: sticky; top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.sidebar-title {
  font-size: 0.7rem; font-weight: 800;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--gray-400); margin-bottom: 20px;
}

.filter-list { list-style: none; display: flex; flex-direction: column; }
.filter-item {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid var(--gray-200);
  cursor: pointer;
  font-weight: 700; font-size: 0.88rem;
  letter-spacing: 0.5px; text-transform: uppercase;
  color: var(--black); user-select: none; transition: opacity 0.15s;
}
.filter-item:hover { opacity: 0.55; }

.fcheck {
  width: 17px; height: 17px;
  border: 2px solid var(--black); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--white); transition: background 0.12s;
}
.filter-item.active .fcheck { background: var(--yellow); }
.fcheck-dot { width: 7px; height: 7px; background: var(--black); display: none; }
.filter-item.active .fcheck-dot { display: block; }

.filter-emoji { font-size: 1rem; }
.filter-label { flex: 1; }
.filter-count { font-size: 0.72rem; font-weight: 600; color: var(--gray-400); }

.clear-btn {
  display: block; margin-top: 20px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.72rem; font-weight: 800;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--black); text-decoration: underline;
  text-underline-offset: 3px;
  background: none; border: none; cursor: pointer; padding: 0;
}

.sidebar-promo {
  margin-top: 36px; background: var(--yellow);
  border: 1.5px solid var(--black); padding: 18px 16px;
}
.sidebar-promo-icon { font-size: 2rem; display: block; margin-bottom: 6px; }
.sidebar-promo-title { font-size: 0.9rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.sidebar-promo-text { font-size: 0.78rem; font-weight: 500; color: var(--gray-600); line-height: 1.4; }

@media (max-width: 860px) {
  .sidebar { position: static; height: auto; border-right: none; border-bottom: 1.5px solid var(--black); padding: 20px 24px; }
  .filter-list { flex-direction: row; flex-wrap: wrap; gap: 6px; }
  .filter-item { border-bottom: 1.5px solid var(--black); padding: 7px 12px; font-size: 0.8rem; }
  .filter-count { display: none; }
  .sidebar-promo { display: none; }
}
</style>
