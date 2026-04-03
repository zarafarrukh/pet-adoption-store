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
      </li>
    </ul>
    <button class="clear-btn" v-if="activeFilters.length" @click="$emit('clear')">
      ✕ Clear all
    </button>
    <div class="sidebar-promo">
      <span class="sidebar-promo-icon">🏡</span>
      <div class="sidebar-promo-title">All pets vetted</div>
      <div class="sidebar-promo-text">Health-checked and ready.</div>
    </div>
  </aside>
</template>

<script setup>
defineProps(['tags', 'activeFilters']);
defineEmits(['toggle', 'clear']);
</script>

<style scoped>
.sidebar { border-right: 1.5px solid #111; padding: 36px 28px; height: calc(100vh - 64px); position: sticky; top: 64px; }
.sidebar-title { font-size: 0.7rem; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #999; margin-bottom: 20px; }
.filter-list { list-style: none; display: flex; flex-direction: column; }
.filter-item { display: flex; align-items: center; gap: 10px; padding: 12px 0; border-bottom: 1px solid #E8E8E8; cursor: pointer; font-weight: 700; text-transform: uppercase; }
.fcheck { width: 17px; height: 17px; border: 2px solid #111; display: flex; align-items: center; justify-content: center; }
.active .fcheck { background: #F9E000; }
.fcheck-dot { width: 7px; height: 7px; background: #111; display: none; }
.active .fcheck-dot { display: block; }
.clear-btn { margin-top: 20px; font-weight: 800; text-decoration: underline; background: none; border: none; cursor: pointer; }
.sidebar-promo { margin-top: 36px; background: #F9E000; border: 1.5px solid #111; padding: 18px 16px; }
</style>