<template>
  <div :class="['merch-page', { 'merch-large-text': isLargeText }]">
    <!-- Awning stripes -->
    <div class="merch-awning" aria-hidden="true">
      <div class="merch-stripe" v-for="n in 20" :key="n"></div>
    </div>

    <!-- Storefront header with SVG cat on it-->
    <header class="merch-storefront">
      <div class="merch-store-identity">
        <h1 class="merch-store-name">
          The 
          <span class="logo-p-container">
            <svg class="header-cat" viewBox="0 0 50 30" width="45" height="25">
              <path class="cat-tail-wag" d="M10,20 Q2,15 5,10" fill="none" stroke="var(--black)" stroke-width="3" stroke-linecap="round" />
              <path d="M12,25 Q12,10 25,10 T38,25 Z" fill="white" stroke="var(--black)" stroke-width="2" />
              <circle cx="35" cy="15" r="7" fill="white" stroke="var(--black)" stroke-width="2" />
              <path d="M30,10 L32,4 L35,8" fill="white" stroke="var(--black)" stroke-width="2" />
              <path d="M40,10 L38,4 L35,8" fill="white" stroke="var(--black)" stroke-width="2" />
              <path d="M32,15 Q33,16 34,15" fill="none" stroke="var(--black)" stroke-width="1" />
              <path d="M36,15 Q37,16 38,15" fill="none" stroke="var(--black)" stroke-width="1" />
            </svg>
            P
          </span>aw-tique
        </h1>
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

        <!-- Donation mason jar -->
        <div class="merch-donation-box">
          <p class="merch-donation-label">Shelter fund jar</p>

          <div ref="jarContainer" class="merch-d3-jar"></div>

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

        <div v-if="isLoading" class="merch-empty">
          <p>Loading the shop...</p>
        </div>

        <div v-else class="merch-grid">
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
                <div class="merch-card-prices">
                  <span v-if="item.salePrice" class="merch-card-original-price">
                    ${{ item.price.toFixed(2) }}
                  </span>
                  <span class="merch-card-price" :class="{ 'merch-price-sale': item.salePrice }">
                    ${{ item.salePrice ? item.salePrice.toFixed(2) : item.price.toFixed(2) }}
                  </span>
                </div>
                <div class="merch-card-actions">

                  <!--REQUIREMENT: SVG speaker symbol for text-to-speech button-->
                  <button
                    class="merch-tts-btn"
                    @click="readAloud(item)"
                    title="Read description aloud"
                    aria-label="Read description aloud"
                  ><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="merch-tts-icon">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg></button>
                  <button v-if="item.stock > 0" class="merch-add-btn" @click="addToCart(item, $event)">
                    + Add
                  </button>
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
            <img src="/src/assets/images/empty-basket.png" alt="Sleeping cat" class="empty-basket-icon" />
            <p>Your basket is empty.</p>
          </div>

          <div v-else>
            <div v-for="(item, index) in cart" :key="index" class="merch-cart-item">
              <div class="merch-cart-img-box">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="merch-cart-img" />
                <span v-else class="merch-cart-emoji">{{ item.emoji }}</span>
              </div>

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

            <button class="merch-checkout-btn" @click="checkout" :disabled="isCheckingOut">
              {{ isCheckingOut ? 'Processing...' : 'Checkout' }}
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
          <button class="merch-donate-submit" @click="submitDonation" :disabled="isDonating">
            {{ isDonating ? 'Processing...' : `Donate $${donationInput || 0}` }}
          </button>
          <button class="merch-modal-close" @click="isDonateOpen = false">Cancel</button>
        </div>
      </div>
    </transition>

    <transition name="merch-fade">
      <div v-if="isCheckoutSuccess" class="merch-modal-overlay" @click.self="isCheckoutSuccess = false">
        <div class="merch-modal">
          <h2 class="merch-modal-title">🎉 Order Placed!</h2>
          <p class="merch-modal-sub">Thank you for supporting PawMatch. Every purchase helps a pet in need find their forever home.</p>
      
          <button class="merch-donate-submit" @click="isCheckoutSuccess = false">
            Continue Shopping
          </button>
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
import { ref, computed, onMounted, watch } from 'vue';
import { CATEGORIES, FILTERS, SORT_OPTIONS, DONATE_AMOUNTS } from '../data/merch'
// REQUIREMENT: Additional Technology firebase
// Firebase Firestore integrated as a live, cloud-based Data Store
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import * as d3 from 'd3';

// ── State ──
const items = ref([])
const isLoading = ref(true)
const cart         = ref([]);
const searchQuery  = ref('');
const activeCategory = ref('All');
const activeFilters  = ref([]);
const sortBy         = ref('featured');
const isCartOpen     = ref(false);
const isCheckingOut = ref(false);
const isCheckoutSuccess = ref(false);
const isDonateOpen   = ref(false);
const isLargeText    = ref(false);
const isDarkMode     = ref(false);
const donationTotal  = ref(630);
const donationGoal   = ref(1000);
const donationInput  = ref(10);
const isDonating = ref(false);
// --- D3 State ---
const jarContainer = ref(null);
let svgWidth = 80;
let svgHeight = 110;


// REQUIREMENT: AJAX, web services
// Asynchronous HTTP calls fetch dynamic inventory and store statistics directly from Firestore
onMounted(async () => {
  // Check the "notebook" for a saved basket
  const savedCart = localStorage.getItem('pawmatch-basket');
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }

  try {
    // 1. Fetch Merch Items
    const snapshot = await getDocs(collection(db, 'merch_items'))
    console.log('docs fetched:', snapshot.docs.length)
    console.log('first doc:', snapshot.docs[0]?.data())
    items.value = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        price: Number(data.price),  // force from string to number from firebase
        salePrice: data.salePrice ? Number(data.salePrice) : null,
      }
    })

    // 2. Fetch Donation Jar Stats (NEW CODE)
    const donationRef = doc(db, 'store_stats', 'donations');
    const donationSnap = await getDoc(donationRef);
    if (donationSnap.exists()) {
      donationTotal.value = donationSnap.data().total;
      donationGoal.value = donationSnap.data().goal;
    }

    isLoading.value = false
  } catch (err) {
    console.error('Firebase error:', err)
    isLoading.value = false;
    // Draw D3 jar after Vue finishes setting up the HTML
    setTimeout(() => {
      renderD3Jar();
    }, 100);
  }
});

// Redraw jar and add bubbles when donation changes
watch(donationTotal, () => {
  renderD3Jar();
  spawnBubbles();
});

// Automatically syncs the reactive cart state to browser localStorage
watch(cart, (newCart) => {
  localStorage.setItem('pawmatch-basket', JSON.stringify(newCart));
}, { deep: true }); // "deep: true" is critical so it sees when items are added/removed

// REQUIREMENT: D3.js Liquid Wave Logic
function renderD3Jar() {
  if (!jarContainer.value) return;

  // Clear previous SVG to prevent duplicates
  d3.select(jarContainer.value).selectAll("*").remove();

  const svg = d3.select(jarContainer.value)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("border", "1.5px solid var(--black)")
    .style("border-radius", "4px 4px 24px 24px")
    .style("background", "transparent")
    .style("overflow", "hidden")
    .style("display", "block")
    .style("margin", "0 auto 16px auto");

  const percent = donationPercent.value / 100;
  const liquidHeight = svgHeight * percent;
  const yPos = svgHeight - liquidHeight;

  const group = svg.append("g");

  // Liquid base
  group.append("rect")
    .attr("x", 0)
    .attr("y", yPos)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "var(--merch-sage)");

  // Wave mathematics
  const waveScale = d3.scaleLinear().range([0, svgWidth * 2]).domain([0, 1]);
  const waveGenerator = d3.area()
    .x(d => waveScale(d.x))
    .y0(d => yPos + Math.sin(d.y * Math.PI * 4) * 4) // wave amplitude
    .y1(svgHeight);

  // Create data points for the wave curve
  const waveData = [];
  for (let i = 0; i <= 1; i += 0.02) {
    waveData.push({ x: i, y: i });
  }

  const wave = group.append("path")
    .datum(waveData)
    .attr("d", waveGenerator)
    .attr("fill", "var(--merch-sage)");

  // Infinite looping wave animation
  function animateWave() {
    wave.transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("transform", `translate(-${svgWidth}, 0)`)
      .on("end", () => {
        wave.attr("transform", "translate(0, 0)");
        animateWave();
      });
  }
  animateWave();
}

function spawnBubbles() {
  if (!jarContainer.value) return;
  const svg = d3.select(jarContainer.value).select("svg");
  
  const numBubbles = Math.floor(Math.random() * 4) + 6;
  for (let i = 0; i < numBubbles; i++) {
    const startX = Math.random() * svgWidth;
    const size = Math.random() * 4 + 2;
    const targetY = svgHeight - (svgHeight * (donationPercent.value / 100)) - 10;
    
    svg.append("circle")
      .attr("cx", startX)
      .attr("cy", svgHeight)
      .attr("r", size)
      .attr("fill", "rgba(255, 255, 255, 0.8)")
      .transition()
      .duration(1000 + Math.random() * 1500)
      .ease(d3.easeCubicOut)
      .attr("cy", targetY)
      .style("opacity", 0)
      .remove();
  }
}

// ── Computed donations ──
const donationPercent = computed(() =>
  Math.min((donationTotal.value / donationGoal.value) * 100, 100)
);

// REQUIREMENT: JavaScript
// Complex functional programming pipeline (filter, includes, toLowerCase, sort)
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

// REQUIREMENT: JavaScript - Array reduction for financial totals
const cartTotal = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price, 0).toFixed(2)
);

// ── Methods ──
function addToCart(item, event) {
  if (item.stock > 0) {
    cart.value.push({ 
      ...item, 
      price: item.salePrice ?? item.price  // use sale price if exists
    });
    item.stock--;
    if (event) spawnPawfetti(event);
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

function readAloud(item) {
  // Stop any currently playing speech so they don't overlap
  window.speechSynthesis.cancel();

  // 1. Start with the name and category
  let speechText = `${item.name}. Category: ${item.category}. `;

  // 2. Add therapy certification if it applies
  if (item.isTherapyCertified) {
    speechText += `This item is therapy certified. `;
  }

  // 3. Handle pricing (incase sale is mentioned)
  if (item.salePrice) {
    speechText += `Currently on sale for ${item.salePrice} dollars, originally ${item.price} dollars. `;
  } else {
    speechText += `Price: ${item.price} dollars. `;
  }

  // 4. Mention if it is sold out
  if (item.stock === 0) {
    speechText += `Currently sold out. `;
  }

  // 5. Add item description
  speechText += `Description: ${item.description}`;

  // Read out loud
  const utterance = new SpeechSynthesisUtterance(speechText);
  window.speechSynthesis.speak(utterance);
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
}

function openDonateModal() {
  isDonateOpen.value = true;
}

// REQUIREMENT: AJAX, web services
// Asynchronous database writes using await and exception handling
async function submitDonation() {
  if (!donationInput.value || donationInput.value <= 0) return;
  
  isDonating.value = true; // Changes button to "Processing..."

  try {
    const newTotal = donationTotal.value + donationInput.value;
    const donationRef = doc(db, 'store_stats', 'donations');

    // Tell Firebase to update the total
    await updateDoc(donationRef, { total: newTotal });

    donationTotal.value = newTotal;
    isDonateOpen.value = false;
    donationInput.value = 10; // Reset input back to default

    // Reuse success modal by opening it after donation
    isCheckoutSuccess.value = true; 

  } catch (err) {
    console.error("Donation failed:", err);
    alert('Donation unavailable right now. Please try again later.');
  } finally {
    isDonating.value = false;
  }
}

// Uses ES6 `Set` to prevent duplicate writes, and `Promise.all` to batch concurrent network requests
async function checkout() {
  if (cart.value.length === 0) return;
  
  isCheckingOut.value = true; // Changes the button text to "Processing..."

  try {
    // 1. Find items needing their stock updated
    const itemsToUpdate = new Set(cart.value.map(item => item.id));

    const updatePromises = [];
    
    // 2. Loop through and tell Firebase the new stock number
    for (const id of itemsToUpdate) {
      const currentItem = items.value.find(i => i.id === id);
      const itemRef = doc(db, 'merch_items', id);
      
      // We push the Firebase update task into an array
      updatePromises.push(updateDoc(itemRef, { stock: currentItem.stock }));
    }

    // 3. Wait for all Firebase updates to finish at the same time
    await Promise.all(updatePromises);

    // 4. Clear the cart and show the modal
    cart.value = [];
    isCartOpen.value = false;
    isCheckoutSuccess.value = true; 

  } catch (err) {
    console.error("Checkout failed:", err);
    alert('Checkout unavailable right now. Please try again later.');
  } finally {
    isCheckingOut.value = false;
  }
}

// Micro-interaction: Dynamic particle explosion for positive feedback
function spawnPawfetti(event) {
  const numParticles = 6;
  const colors = [
    'var(--merch-sage)', 
    'var(--merch-amber)', 
    'var(--merch-rose)'];
  
  // Create a temporary overlay for the particles
  const svg = d3.select("body")
    .append("svg")
    .style("position", "fixed")
    .style("top", 0)
    .style("left", 0)
    .style("width", "100vw")
    .style("height", "100vh")
    .style("pointer-events", "none")
    .style("z-index", 9999);

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const heartPath = "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.41,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.59,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z";

  for (let i = 0; i < numParticles; i++) {
    const angle = Math.random() * Math.PI * 2; // 360 degrees
    const velocity = 40 + Math.random() * 60;   // Distance
    const destinationX = mouseX + Math.cos(angle) * velocity;
    const destinationY = mouseY + Math.sin(angle) * velocity;
    const rotation = Math.random() * 360;

    svg.append("path")
      .attr("d", heartPath)
      .attr("fill", colors[Math.floor(Math.random() * colors.length)])
      .attr("transform", `translate(${mouseX}, ${mouseY}) scale(0.7) rotate(${rotation})`)
      .style("opacity", 1)
      .transition()
      .duration(800 + Math.random() * 400)
      .ease(d3.easeCubicOut)
      .attr("transform", `translate(${destinationX}, ${destinationY}) scale(0.5) rotate(${rotation + 90})`)
      .style("opacity", 0)
      .remove(); // Clean up the DOM
  }

  // Remove the temporary SVG container after particles finish
  setTimeout(() => svg.remove(), 1500);
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
</style>