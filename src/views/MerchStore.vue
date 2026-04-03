<script setup>
import { ref, computed } from 'vue';
import { merchItems } from '../data/merch';

// State
const items = ref(merchItems);
const cart = ref([]);
const searchQuery = ref("");
const isLargeText = ref(false); // Accessibility feature

// Requirement: Vue Reactivity
const filteredItems = computed(() => {
  return items.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const addToCart = (item) => {
  if (item.stock > 0) {
    cart.value.push(item);
    item.stock--; // Dynamic DOM update
  }
};

// Accessibility
const readDescription = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};
</script>

<template>
  <div :class="['merch-container', { 'large-text': isLargeText }]">
    
    <div class="accessibility-bar">
      <button @click="isLargeText = !isLargeText">Toggle Text Size</button>
      <span>Cart: {{ cart.length }} items</span>
    </div>

    <header class="merch-header">
      <h1>The Paw-tique 🐾</h1>
      <input v-model="searchQuery" placeholder="Search for toys, snacks, and more..." />
    </header>

    <div class="merch-grid">
      <div v-for="item in filteredItems" :key="item.id" class="merch-card">
        <img :src="item.image" :alt="item.name" />
        
        <div class="card-content">
          <h3>{{ item.name }}</h3>
          <p class="price">${{ item.price.toFixed(2) }}</p>
          
          <span v-if="item.isTherapyCertified" class="uni-badge">🎓 Student-Partner Item</span>
          
          <div class="actions">
            <button @click="addToCart(item)" :disabled="item.stock === 0">
              {{ item.stock > 0 ? 'Add to Cart' : 'Sold Out' }}
            </button>
            <button @click="readDescription(item.description)" class="icon-btn">🔊</button>
          </div>
        </div>
      </div>
    </div>

    <div id="stock-chart"></div>
  </div>
</template>