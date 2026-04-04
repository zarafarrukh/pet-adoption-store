<template>
  <div :class="['merch-page', { 'merch-large-text': isLargeText }]">

    <!-- Awning stripes -->
    <div class="merch-awning" aria-hidden="true">
      <div class="merch-stripe" v-for="n in 20" :key="n"></div>
    </div>

    <!-- Storefront header -->
    <header class="merch-storefront">
      <div class="merch-store-identity">
        <h1 class="merch-store-name">The Paw-tique</h1>
        <p class="merch-store-tagline">handpicked treasures for your beloved companions</p>
      </div>
      <div class="merch-header-actions">
        <div class="merch-accessibility-controls">
          <button class="merch-a11y-btn" @click="isLargeText = !isLargeText" :aria-pressed="isLargeText">
            {{ isLargeText ? 'A−' : 'A+' }}
          </button>
          <button class="merch-a11y-btn" @click="toggleDarkMode" :aria-pressed="isDarkMode">
            {{ isDarkMode ? '☀' : '☾' }}
          </button>
        </div>
        <button class="merch-basket-btn" @click="isCartOpen = !isCartOpen">
          Basket
          <span class="merch-basket-count" v-if="cart.length > 0">{{ cart.length }}</span>
        </button>
      </div>
    </header>

    <!-- Search + filter bar -->
    <div class="merch-search-bar">
      <input
        class="merch-search-input"
        v-model="searchQuery"
        placeholder="search the shop..."
        aria-label="Search products"
      />
      <div class="merch-category-tags">
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          class="merch-tag"
          :class="{ 'merch-tag--active': activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Main body -->
    <div class="merch-body">

      <!-- Sidebar -->
      <aside class="merch-sidebar">
        <p class="merch-sidebar-heading">Filter</p>
        <div
          v-for="filter in FILTERS"
          :key="filter.id"
          class="merch-sidebar-item"
          @click="toggleFilter(filter.id)"
        >
          <div class="merch-tick" :class="{ 'merch-tick--on': activeFilters.includes(filter.id) }"></div>
          {{ filter.label }}
        </div>

        <hr class="merch-rule" />

        <p class="merch-sidebar-heading">Sort by</p>
        <div
          v-for="opt in SORT_OPTIONS"
          :key="opt.value"
          class="merch-sidebar-item"
          @click="sortBy = opt.value"
        >
          <div class="merch-tick" :class="{ 'merch-tick--on': sortBy === opt.value }"></div>
          {{ opt.label }}
        </div>

        <hr class="merch-rule" />

        <!-- Donation mason jar (D3 target) -->
        <div class="merch-donation-box">
          <p class="merch-donation-label">Shelter fund</p>
          <div class="merch-jar">
            <div class="merch-jar-fill" :style="{ height: donationPercent + '%' }"></div>
          </div>
          <p class="merch-jar-amount">${{ donationTotal }} of ${{ donationGoal }}</p>
          <button class="merch-donate-btn" @click="openDonateModal">Donate</button>
        </div>
      </aside>

      <!-- Product grid -->
      <main class="merch-main">
        <p class="merch-section-label">{{ filteredItems.length }} items available</p>

        <!-- Empty state -->
        <div v-if="filteredItems.length === 0" class="merch-empty">
          <p>No items found. Try a different search or filter.</p>
        </div>

        <div class="merch-grid">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="merch-card"
            :class="{ 'merch-card--soldout': item.stock === 0 }"
          >
            <div class="merch-card-img">
              <img v-if="item.image" :src="item.image" :alt="item.name" />
              <span v-else class="merch-card-emoji">{{ item.emoji }}</span>
              <div v-if="item.stock === 0" class="merch-sold-overlay">Sold Out</div>
              <div v-if="item.isNew" class="merch-new-badge">New</div>
            </div>

            <div class="merch-card-body">
              <div v-if="item.isTherapyCertified" class="merch-therapy-badge">
                therapy certified
              </div>
              <p class="merch-card-ribbon">{{ item.category }}</p>
              <h3 class="merch-card-name">{{ item.name }}</h3>
              <p class="merch-card-desc">{{ item.description }}</p>

              <div class="merch-card-footer">
                <span class="merch-card-price">${{ item.price.toFixed(2) }}</span>
                <div class="merch-card-actions">
                  <button
                    class="merch-tts-btn"
                    @click="readAloud(item.description)"
                    title="Read description aloud"
                    aria-label="Read description aloud"
                  >🔊</button>
                  <button
                    v-if="item.stock > 0"
                    class="merch-add-btn"
                    @click="addToCart(item)"
                  >+ Add</button>
                  <span v-else class="merch-soldout-badge">Sold out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Cart sidebar (Dynamic DOM) -->
    <transition name="merch-slide">
      <div v-if="isCartOpen" class="merch-cart-overlay" @click.self="isCartOpen = false">
        <aside class="merch-cart">
          <div class="merch-cart-header">
            <h2 class="merch-cart-title">Your Basket</h2>
            <button class="merch-cart-close" @click="isCartOpen = false">✕</button>
          </div>

          <div v-if="cart.length === 0" class="merch-cart-empty">
            <p>Your basket is empty.</p>
          </div>

          <div v-else>
            <div v-for="(item, index) in cart" :key="index" class="merch-cart-item">
              <span class="merch-cart-emoji">{{ item.emoji }}</span>
              <div class="merch-cart-item-info">
                <p class="merch-cart-item-name">{{ item.name }}</p>
                <p class="merch-cart-item-price">${{ item.price.toFixed(2) }}</p>
              </div>
              <button class="merch-cart-remove" @click="removeFromCart(index)">✕</button>
            </div>

            <div class="merch-cart-total">
              <span>Total</span>
              <span>${{ cartTotal }}</span>
            </div>

            <button class="merch-checkout-btn" @click="checkout">
              Checkout
            </button>
          </div>
        </aside>
      </div>
    </transition>

    <!-- Donation modal (Dynamic DOM) -->
    <transition name="merch-fade">
      <div v-if="isDonateOpen" class="merch-modal-overlay" @click.self="isDonateOpen = false">
        <div class="merch-modal">
          <h2 class="merch-modal-title">Support the Shelter</h2>
          <p class="merch-modal-sub">Every donation feeds, shelters, and cares for a pet in need.</p>
          <div class="merch-donate-amounts">
            <button
              v-for="amt in DONATE_AMOUNTS"
              :key="amt"
              class="merch-donate-amount-btn"
              :class="{ 'merch-donate-amount-btn--active': donationInput === amt }"
              @click="donationInput = amt"
            >${{ amt }}</button>
          </div>
          <input
            class="merch-donate-custom"
            type="number"
            v-model.number="donationInput"
            placeholder="Or enter custom amount..."
          />
          <button class="merch-donate-submit" @click="submitDonation">
            Donate ${{ donationInput || 0 }}
          </button>
          <button class="merch-modal-close" @click="isDonateOpen = false">Cancel</button>
        </div>
      </div>
    </transition>

    <!-- Footer -->
    <footer class="merch-footer">
      <span class="merch-footer-brand">The Paw-tique</span>
      <span class="merch-footer-note">every purchase feeds a shelter pet</span>
      <span class="merch-footer-copy">PawMatch · 2026</span>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { MERCH_ITEMS, CATEGORIES, FILTERS, SORT_OPTIONS, DONATE_AMOUNTS } from '../data/merch';

// ── State ──────────────────────────────────────────────────────────────────
const items        = ref(MERCH_ITEMS.map(i => ({ ...i })));
const cart         = ref([]);
const searchQuery  = ref('');
const activeCategory = ref('All');
const activeFilters  = ref([]);
const sortBy         = ref('featured');
const isCartOpen     = ref(false);
const isDonateOpen   = ref(false);
const isLargeText    = ref(false);
const isDarkMode     = ref(false);
const donationTotal  = ref(630);
const donationGoal   = ref(1000);
const donationInput  = ref(10);

// ── Computed ───────────────────────────────────────────────────────────────
const donationPercent = computed(() =>
  Math.min((donationTotal.value / donationGoal.value) * 100, 100)
);

const filteredItems = computed(() => {
  let result = items.value;

  // Category filter
  if (activeCategory.value !== 'All') {
    result = result.filter(i => i.category === activeCategory.value);
  }

  // Sidebar filters
  if (activeFilters.value.includes('new'))      result = result.filter(i => i.isNew);
  if (activeFilters.value.includes('sale'))     result = result.filter(i => i.onSale);
  if (activeFilters.value.includes('therapy'))  result = result.filter(i => i.isTherapyCertified);

  // Search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sortBy.value === 'price-asc')  return [...result].sort((a, b) => a.price - b.price);
  if (sortBy.value === 'price-desc') return [...result].sort((a, b) => b.price - a.price);
  return result;
});

const cartTotal = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price, 0).toFixed(2)
);

// ── Methods ────────────────────────────────────────────────────────────────
function addToCart(item) {
  if (item.stock > 0) {
    cart.value.push({ ...item });
    item.stock--;
  }
}

function removeFromCart(index) {
  const removed = cart.value.splice(index, 1)[0];
  const original = items.value.find(i => i.id === removed.id);
  if (original) original.stock++;
}

function toggleFilter(id) {
  const idx = activeFilters.value.indexOf(id);
  idx === -1 ? activeFilters.value.push(id) : activeFilters.value.splice(idx, 1);
}

function readAloud(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
}

function openDonateModal() {
  isDonateOpen.value = true;
}

// AJAX: POST donation to Express backend
async function submitDonation() {
  if (!donationInput.value || donationInput.value <= 0) return;
  try {
    const res = await fetch('/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: donationInput.value }),
    });
    const data = await res.json();
    if (data.success) {
      donationTotal.value += donationInput.value;
      isDonateOpen.value = false;
      donationInput.value = 10;
    }
  } catch (err) {
    // Dev fallback — update locally if no backend yet
    donationTotal.value += donationInput.value;
    isDonateOpen.value = false;
  }
}

// AJAX: POST checkout to Express backend
async function checkout() {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.value }),
    });
    const data = await res.json();
    if (data.success) {
      cart.value = [];
      isCartOpen.value = false;
      alert('Order placed! Thank you for supporting PawMatch 🐾');
    }
  } catch (err) {
    alert('Checkout unavailable right now. Please try again later.');
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
</style>