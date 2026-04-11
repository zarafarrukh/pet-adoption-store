<template>
  <div class="quiz-page">

    <!-- ═══════════════════════════════════════════
         INTRO SCREEN
    ═══════════════════════════════════════════ -->
    <transition name="fade">
      <div v-if="phase === 'intro'" class="quiz-intro">
        <div class="intro-paw-bg" aria-hidden="true">
          <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60"  cy="60"  r="18" />
            <circle cx="105" cy="40"  r="18" />
            <circle cx="150" cy="60"  r="18" />
            <circle cx="170" cy="105" r="18" />
            <path d="M110 95 C70 95, 50 125, 55 155 C60 185, 85 200, 110 200 C135 200, 160 185, 165 155 C170 125, 150 95, 110 95Z" />
          </svg>
        </div>
        <div class="intro-content">
          <p class="intro-kicker">🐾 PetMatcher Quiz</p>
          <h1 class="intro-title">Find your perfect<br /><em>companion</em></h1>
          <p class="intro-sub">
            Answer {{ QUESTIONS.length }} quick questions about your lifestyle and we'll
            match you with real residents from our shelter looking for a home just like yours.
          </p>
          <button class="intro-start-btn" @click="startQuiz">
            Start the Quiz →
          </button>
        </div>
      </div>
    </transition>

    <!-- ═══════════════════════════════════════════
         QUIZ SCREEN
    ═══════════════════════════════════════════ -->
    <transition name="fade">
      <div v-if="phase === 'quiz'" class="quiz-shell">

        <!-- Paw print trail progress -->
        <div class="paw-trail" aria-label="Quiz progress">
          <div
            v-for="(q, i) in QUESTIONS"
            :key="i"
            class="paw-step"
            :class="{
              'paw-step--done':    i < currentQ,
              'paw-step--active':  i === currentQ,
              'paw-step--future':  i > currentQ,
            }"
          >
            <svg class="paw-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <ellipse cx="10" cy="11" rx="4.5" ry="5.5" />
              <ellipse cx="20"  cy="7"  rx="4.5" ry="5.5" />
              <ellipse cx="30" cy="11" rx="4.5" ry="5.5" />
              <ellipse cx="34" cy="21" rx="4"   ry="5"   />
              <path d="M20 18 C10 18, 6 26, 7 32 C8 38, 14 40, 20 40 C26 40, 32 38, 33 32 C34 26, 30 18, 20 18Z" />
            </svg>
            <span class="paw-num">{{ i + 1 }}</span>
          </div>
          <!-- Connecting line -->
          <div class="paw-trail-line">
            <div class="paw-trail-fill" :style="{ width: trailPercent + '%' }"></div>
          </div>
        </div>

        <!-- Question card -->
        <transition name="slide-q" mode="out-in">
          <div class="q-card" :key="currentQ">
            <div class="q-meta">
              Question {{ currentQ + 1 }} of {{ QUESTIONS.length }}
            </div>
            <h2 class="q-text">{{ QUESTIONS[currentQ].question }}</h2>

            <!-- Rating questions (emoji scale) -->
            <div v-if="QUESTIONS[currentQ].type === 'rating'" class="q-rating">
              <div
                v-for="opt in QUESTIONS[currentQ].options"
                :key="opt.value"
                class="rating-option"
                :class="{ 'rating-option--selected': answers[currentQ] === opt.value }"
                @click="selectAnswer(opt.value)"
              >
                <div class="rating-icons">
                  <span
                    v-for="n in QUESTIONS[currentQ].max"
                    :key="n"
                    class="rating-icon"
                    :class="{ 'rating-icon--lit': n <= opt.value }"
                  >{{ QUESTIONS[currentQ].icon }}</span>
                </div>
                <div class="rating-label">{{ opt.label }}</div>
              </div>
            </div>

            <!-- Choice questions (clickable cards with icons) -->
            <div v-else class="q-choices">
              <button
                v-for="opt in QUESTIONS[currentQ].options"
                :key="opt.value"
                class="choice-card"
                :class="{ 'choice-card--selected': answers[currentQ] === opt.value }"
                @click="selectAnswer(opt.value)"
              >
                <span class="choice-icon">{{ opt.icon }}</span>
                <span class="choice-label">{{ opt.label }}</span>
                <span class="choice-check">✓</span>
              </button>
            </div>

            <div class="q-nav">
              <button class="q-back-btn" v-if="currentQ > 0" @click="prevQ">← Back</button>
              <button
                class="q-next-btn"
                :disabled="answers[currentQ] === undefined"
                @click="nextQ"
              >
                {{ currentQ === QUESTIONS.length - 1 ? 'See my matches 🐾' : 'Next →' }}
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- ═══════════════════════════════════════════
         RESULTS SCREEN
    ═══════════════════════════════════════════ -->
    <transition name="fade">
      <div v-if="phase === 'results'" class="quiz-results">
        <div class="results-header">
          <p class="results-kicker">Your perfect matches</p>
          <h2 class="results-title">We found <em>{{ matches.length }}</em> pets that suit your lifestyle</h2>
          <p class="results-sub">Based on your answers, these shelter residents are looking for a home just like yours.</p>
        </div>

        <div class="matches-grid">
          <div
            v-for="(match, i) in matches"
            :key="match.pet.id"
            class="match-card"
            :style="{ animationDelay: i * 0.1 + 's' }"
            @click="$emit('open-modal', match.pet)"
          >
            <div class="match-rank">
              <span v-if="i === 0">🥇</span>
              <span v-else-if="i === 1">🥈</span>
              <span v-else-if="i === 2">🥉</span>
              <span v-else>#{{ i + 1 }}</span>
            </div>

            <div class="match-img-wrap">
              <img :src="match.pet.image" :alt="match.pet.name" />
            </div>

            <div class="match-body">
              <div class="match-tag">{{ tagEmoji(match.pet.tag) }} {{ capitalize(match.pet.tag) }}</div>
              <h3 class="match-name">{{ match.pet.name }}</h3>
              <p class="match-breed">{{ match.pet.breed }} · {{ match.pet.age }}</p>
              <p class="match-snippet">{{ match.pet.temperament }}</p>

              <!-- Compatibility bar -->
              <div class="match-compat">
                <div class="compat-label">Compatibility</div>
                <div class="compat-bar-bg">
                  <div
                    class="compat-bar-fill"
                    :style="{ width: match.score + '%' }"
                  ></div>
                </div>
                <span class="compat-pct">{{ match.score }}%</span>
              </div>

              <!-- Trait icons -->
              <div class="match-traits">
                <div class="trait">
                  <span class="trait-icons">
                    <span v-for="n in 5" :key="n" :class="{ 'trait-lit': n <= match.traits.energy }">⚡</span>
                  </span>
                  <span class="trait-label">Energy</span>
                </div>
                <div class="trait">
                  <span class="trait-icons">
                    <span v-for="n in 5" :key="n" :class="{ 'trait-lit': n <= match.traits.space }">🏠</span>
                  </span>
                  <span class="trait-label">Space</span>
                </div>
                <div class="trait">
                  <span class="trait-icons">
                    <span v-for="n in 5" :key="n" :class="{ 'trait-lit': n <= match.traits.time }">⏰</span>
                  </span>
                  <span class="trait-label">Time</span>
                </div>
              </div>
            </div>

            <button class="match-adopt-btn" @click.stop="goToAdopt(match.pet)">
              Adopt {{ match.pet.name }}
            </button>
          </div>
        </div>

        <div class="results-actions">
          <button class="retake-btn" @click="retake">↺ Retake Quiz</button>
          <RouterLink to="/browse" class="browse-all-btn">Browse All Pets →</RouterLink>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { PETS, TAGS } from '../data/pets.js'

defineEmits(['open-modal'])
const router = useRouter()

// ─────────────────────────────────────────
// QUIZ DATA
// ─────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'living',
    question: 'What kind of space do you live in?',
    type: 'choice',
    options: [
      { value: 'apartment', label: 'Apartment',        icon: '🏢' },
      { value: 'house',     label: 'House (no yard)',   icon: '🏠' },
      { value: 'yard',      label: 'House with yard',   icon: '🌳' },
      { value: 'rural',     label: 'Rural / Farm',      icon: '🏡' },
    ],
  },
  {
    id: 'activity',
    question: 'How active is your daily routine?',
    type: 'rating',
    icon: '⚡',
    max: 5,
    options: [
      { value: 1, label: 'Very relaxed — mostly indoors' },
      { value: 2, label: 'Light — occasional short walks' },
      { value: 3, label: 'Moderate — daily walks or gym' },
      { value: 4, label: 'Active — outdoor activities often' },
      { value: 5, label: 'Very active — hikes, runs daily' },
    ],
  },
  {
    id: 'time',
    question: 'How many hours per day can you dedicate to a pet?',
    type: 'rating',
    icon: '⏰',
    max: 5,
    options: [
      { value: 1, label: 'Less than 1 hour' },
      { value: 2, label: '1 – 2 hours' },
      { value: 3, label: '2 – 4 hours' },
      { value: 4, label: '4 – 6 hours' },
      { value: 5, label: 'All day — I work from home' },
    ],
  },
  {
    id: 'noise',
    question: 'How do you feel about noise and mess?',
    type: 'choice',
    options: [
      { value: 'silent',   label: 'Need it quiet',       icon: '🤫' },
      { value: 'low',      label: 'A little noise is fine', icon: '🔉' },
      { value: 'medium',   label: 'Comfortable with both', icon: '🔊' },
      { value: 'anything', label: 'Anything goes!',       icon: '🎉' },
    ],
  },
  {
    id: 'experience',
    question: 'What\'s your pet ownership experience?',
    type: 'choice',
    options: [
      { value: 'none',       label: 'First-time owner',        icon: '🌱' },
      { value: 'some',       label: 'Had pets as a kid',       icon: '📚' },
      { value: 'experienced',label: 'Owned pets as an adult',  icon: '🏅' },
      { value: 'expert',     label: 'Expert, multiple pets',   icon: '⭐' },
    ],
  },
  {
    id: 'affection',
    question: 'How cuddly do you want your companion to be?',
    type: 'choice',
    options: [
      { value: 'independent', label: 'Independent & low-maintenance', icon: '😎' },
      { value: 'medium',      label: 'Affectionate but has own space', icon: '🤝' },
      { value: 'cuddly',      label: 'Very cuddly & always near me',   icon: '🥰' },
    ],
  },
  {
    id: 'children',
    question: 'Do you have children or other pets at home?',
    type: 'choice',
    options: [
      { value: 'none',     label: 'Just me (or adults only)',  icon: '🧑' },
      { value: 'children', label: 'Yes, children at home',     icon: '👶' },
      { value: 'pets',     label: 'Yes, other pets at home',   icon: '🐾' },
      { value: 'both',     label: 'Both children and pets',    icon: '🏡' },
    ],
  },
]

// ─────────────────────────────────────────
// SCORING CONFIG per pet type
// Maps quiz answers to compatibility scores (0–100)
// ─────────────────────────────────────────
const PET_PROFILES = {
  cat: {
    living:     { apartment: 100, house: 90, yard: 80, rural: 70 },
    activity:   { 1: 100, 2: 90, 3: 70, 4: 50, 5: 30 },
    time:       { 1: 90,  2: 100, 3: 80, 4: 60, 5: 50 },
    noise:      { silent: 100, low: 90, medium: 70, anything: 60 },
    experience: { none: 90, some: 100, experienced: 100, expert: 100 },
    affection:  { independent: 80, medium: 100, cuddly: 70 },
    children:   { none: 100, children: 70, pets: 80, both: 60 },
  },
  dog: {
    living:     { apartment: 50, house: 80, yard: 100, rural: 100 },
    activity:   { 1: 20, 2: 50, 3: 80, 4: 100, 5: 100 },
    time:       { 1: 20, 2: 50, 3: 80, 4: 100, 5: 100 },
    noise:      { silent: 30, low: 60, medium: 90, anything: 100 },
    experience: { none: 60, some: 80, experienced: 100, expert: 100 },
    affection:  { independent: 40, medium: 80, cuddly: 100 },
    children:   { none: 80, children: 100, pets: 80, both: 100 },
  },
  bunny: {
    living:     { apartment: 90, house: 90, yard: 80, rural: 70 },
    activity:   { 1: 100, 2: 90, 3: 70, 4: 50, 5: 30 },
    time:       { 1: 80, 2: 90, 3: 100, 4: 80, 5: 70 },
    noise:      { silent: 100, low: 100, medium: 70, anything: 50 },
    experience: { none: 70, some: 80, experienced: 100, expert: 100 },
    affection:  { independent: 60, medium: 100, cuddly: 80 },
    children:   { none: 100, children: 60, pets: 70, both: 50 },
  },
  reptile: {
    living:     { apartment: 100, house: 90, yard: 70, rural: 60 },
    activity:   { 1: 100, 2: 90, 3: 70, 4: 50, 5: 30 },
    time:       { 1: 100, 2: 90, 3: 70, 4: 60, 5: 50 },
    noise:      { silent: 100, low: 100, medium: 80, anything: 70 },
    experience: { none: 40, some: 60, experienced: 90, expert: 100 },
    affection:  { independent: 100, medium: 60, cuddly: 20 },
    children:   { none: 100, children: 50, pets: 60, both: 40 },
  },
  bird: {
    living:     { apartment: 70, house: 90, yard: 90, rural: 80 },
    activity:   { 1: 70, 2: 80, 3: 90, 4: 80, 5: 70 },
    time:       { 1: 40, 2: 70, 3: 100, 4: 100, 5: 90 },
    noise:      { silent: 20, low: 50, medium: 90, anything: 100 },
    experience: { none: 50, some: 70, experienced: 90, expert: 100 },
    affection:  { independent: 50, medium: 90, cuddly: 100 },
    children:   { none: 80, children: 70, pets: 70, both: 60 },
  },
  fish: {
    living:     { apartment: 100, house: 90, yard: 80, rural: 70 },
    activity:   { 1: 100, 2: 100, 3: 80, 4: 60, 5: 40 },
    time:       { 1: 100, 2: 90, 3: 70, 4: 50, 5: 40 },
    noise:      { silent: 100, low: 100, medium: 90, anything: 80 },
    experience: { none: 100, some: 100, experienced: 90, expert: 80 },
    affection:  { independent: 100, medium: 60, cuddly: 20 },
    children:   { none: 100, children: 90, pets: 80, both: 80 },
  },
  rat: {
    living:     { apartment: 100, house: 90, yard: 80, rural: 70 },
    activity:   { 1: 90, 2: 100, 3: 80, 4: 60, 5: 50 },
    time:       { 1: 50, 2: 80, 3: 100, 4: 90, 5: 80 },
    noise:      { silent: 80, low: 90, medium: 100, anything: 100 },
    experience: { none: 80, some: 90, experienced: 100, expert: 100 },
    affection:  { independent: 60, medium: 100, cuddly: 100 },
    children:   { none: 90, children: 80, pets: 80, both: 70 },
  },
}

// Trait values for display (energy, space, time — out of 5)
const PET_TRAITS = {
  cat:     { energy: 2, space: 2, time: 2 },
  dog:     { energy: 5, space: 4, time: 5 },
  bunny:   { energy: 2, space: 2, time: 3 },
  reptile: { energy: 1, space: 2, time: 1 },
  bird:    { energy: 3, space: 2, time: 4 },
  fish:    { energy: 1, space: 1, time: 1 },
  rat:     { energy: 3, space: 2, time: 3 },
}

// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────
const phase    = ref('intro')  // 'intro' | 'quiz' | 'results'
const currentQ = ref(0)
const answers  = ref({})       // { questionIndex: answerValue }

const trailPercent = computed(() =>
  (currentQ.value / (QUESTIONS.length - 1)) * 100
)

// ─────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────
function startQuiz() {
  answers.value = {}
  currentQ.value = 0
  phase.value = 'quiz'
}

function selectAnswer(value) {
  answers.value[currentQ.value] = value
}

function nextQ() {
  if (answers.value[currentQ.value] === undefined) return
  if (currentQ.value < QUESTIONS.length - 1) {
    currentQ.value++
  } else {
    computeMatches()
    phase.value = 'results'
  }
}

function prevQ() {
  if (currentQ.value > 0) currentQ.value--
}

function retake() {
  answers.value = {}
  currentQ.value = 0
  phase.value = 'quiz'
}

function goToAdopt(pet) {
  router.push({ path: '/adopt', query: { petId: pet.id } })
}

// ─────────────────────────────────────────
// MATCHING ENGINE
// ─────────────────────────────────────────
const matches = ref([])

function computeMatches() {
  const questionKeys = QUESTIONS.map(q => q.id)

  const scored = PETS.map(pet => {
    const profile = PET_PROFILES[pet.tag]
    if (!profile) return { pet, score: 0, traits: PET_TRAITS[pet.tag] || { energy: 3, space: 3, time: 3 } }

    let total = 0
    let count = 0

    QUESTIONS.forEach((q, i) => {
      const answerVal = answers.value[i]
      if (answerVal === undefined) return
      const qProfile = profile[q.id]
      if (!qProfile) return
      const score = qProfile[answerVal] ?? 50
      total += score
      count++
    })

    const rawScore = count > 0 ? Math.round(total / count) : 50

    return {
      pet,
      score: rawScore,
      traits: PET_TRAITS[pet.tag] || { energy: 3, space: 3, time: 3 },
    }
  })

  matches.value = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function tagEmoji(tag) {
  return TAGS.find(t => t.id === tag)?.emoji ?? ''
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>

<style scoped>
/* ─────────────────────────────────────────
   FONTS & ROOT
───────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

.quiz-page {
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  background: var(--bg, #faf9f6);
  color: var(--black, #1a1a1a);
  overflow-x: hidden;
}

/* ─────────────────────────────────────────
   INTRO
───────────────────────────────────────── */
.quiz-intro {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.intro-paw-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.04;
  pointer-events: none;
}

.intro-paw-bg svg {
  width: 90vmin;
  height: 90vmin;
  fill: var(--black, #1a1a1a);
  animation: slow-spin 40s linear infinite;
}

@keyframes slow-spin {
  to { transform: rotate(360deg); }
}

.intro-content {
  position: relative;
  max-width: 640px;
  text-align: center;
  animation: fade-up 0.7s ease both;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.intro-kicker {
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent, #8a6a4e);
  margin-bottom: 1rem;
  font-weight: 500;
}

.intro-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--black, #1a1a1a);
}

.intro-title em {
  font-style: italic;
  color: var(--accent, #8a6a4e);
}

.intro-sub {
  font-size: 1.05rem;
  color: #666;
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto 2.5rem;
}

.intro-start-btn {
  background: var(--black, #1a1a1a);
  color: #fff;
  border: none;
  padding: 1rem 2.4rem;
  font-size: 1rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  letter-spacing: 0.03em;
  transition: transform 0.2s, background 0.2s;
}

.intro-start-btn:hover {
  background: var(--accent, #8a6a4e);
  transform: translateY(-2px);
}

/* ─────────────────────────────────────────
   PAW TRAIL
───────────────────────────────────────── */
.quiz-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 4rem;
}

.paw-trail {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 3.5rem;
  margin-top: 1rem;
  padding: 0 1rem;
}

.paw-trail-line {
  position: absolute;
  top: 50%;
  left: 2rem;
  right: 2rem;
  height: 2px;
  background: #e0dbd5;
  transform: translateY(-50%);
  z-index: 0;
  border-radius: 2px;
}

.paw-trail-fill {
  height: 100%;
  background: var(--accent, #8a6a4e);
  border-radius: 2px;
  transition: width 0.4s ease;
}

.paw-step {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 0 clamp(0.4rem, 2vw, 1.2rem);
  cursor: default;
}

.paw-icon {
  width: 36px;
  height: 36px;
  transition: transform 0.3s, fill 0.3s;
}

.paw-step--done .paw-icon {
  fill: var(--accent, #8a6a4e);
  transform: rotate(-12deg) scale(1);
}

.paw-step--active .paw-icon {
  fill: var(--black, #1a1a1a);
  transform: rotate(6deg) scale(1.25);
  filter: drop-shadow(0 3px 8px rgba(0,0,0,0.18));
  animation: paw-bounce 0.5s ease;
}

@keyframes paw-bounce {
  0%   { transform: rotate(6deg) scale(0.8); }
  60%  { transform: rotate(6deg) scale(1.35); }
  100% { transform: rotate(6deg) scale(1.25); }
}

.paw-step--future .paw-icon {
  fill: #d9d2ca;
}

.paw-num {
  font-size: 0.65rem;
  font-weight: 500;
  color: #999;
  letter-spacing: 0.05em;
}

.paw-step--active .paw-num {
  color: var(--black, #1a1a1a);
  font-weight: 700;
}

.paw-step--done .paw-num {
  color: var(--accent, #8a6a4e);
}

/* ─────────────────────────────────────────
   QUESTION CARD
───────────────────────────────────────── */
.q-card {
  background: #fff;
  border: 1.5px solid #e8e2da;
  border-radius: 20px;
  padding: clamp(1.5rem, 4vw, 2.8rem);
  max-width: 720px;
  width: 100%;
  box-shadow: 0 4px 32px rgba(0,0,0,0.06);
  animation: fade-up 0.35s ease both;
}

.q-meta {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 0.8rem;
  font-weight: 500;
}

.q-text {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.4rem, 3.5vw, 2rem);
  line-height: 1.3;
  margin-bottom: 2rem;
  color: var(--black, #1a1a1a);
}

/* Choice cards */
.q-choices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.9rem;
  margin-bottom: 2rem;
}

.choice-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1.3rem 1rem;
  background: #faf9f6;
  border: 1.5px solid #e3ddd6;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'DM Sans', sans-serif;
  text-align: center;
}

.choice-card:hover {
  border-color: var(--accent, #8a6a4e);
  background: #fdf5ef;
  transform: translateY(-2px);
}

.choice-card--selected {
  border-color: var(--black, #1a1a1a);
  background: var(--black, #1a1a1a);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}

.choice-icon {
  font-size: 2.2rem;
  line-height: 1;
}

.choice-label {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.3;
}

.choice-check {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.choice-card--selected .choice-check {
  opacity: 1;
}

/* Rating options */
.q-rating {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 2rem;
}

.rating-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.2rem;
  background: #faf9f6;
  border: 1.5px solid #e3ddd6;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.rating-option:hover {
  border-color: var(--accent, #8a6a4e);
  background: #fdf5ef;
}

.rating-option--selected {
  border-color: var(--black, #1a1a1a);
  background: var(--black, #1a1a1a);
  color: #fff;
}

.rating-icons {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}

.rating-icon {
  font-size: 1.15rem;
  opacity: 0.2;
  transition: opacity 0.15s;
}

.rating-icon--lit {
  opacity: 1;
}

.rating-label {
  font-size: 0.9rem;
  font-weight: 400;
}

/* Nav buttons */
.q-nav {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
}

.q-back-btn {
  background: transparent;
  border: 1.5px solid #e3ddd6;
  color: #888;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
}

.q-back-btn:hover {
  border-color: #999;
  color: var(--black, #1a1a1a);
}

.q-next-btn {
  background: var(--black, #1a1a1a);
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 100px;
  font-size: 0.95rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.02em;
}

.q-next-btn:hover:not(:disabled) {
  background: var(--accent, #8a6a4e);
  transform: translateY(-1px);
}

.q-next-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* ─────────────────────────────────────────
   RESULTS
───────────────────────────────────────── */
.quiz-results {
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem);
  max-width: 1200px;
  margin: 0 auto;
}

.results-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fade-up 0.5s ease both;
}

.results-kicker {
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent, #8a6a4e);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.results-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  margin-bottom: 0.75rem;
  color: var(--black, #1a1a1a);
}

.results-title em {
  color: var(--accent, #8a6a4e);
  font-style: italic;
}

.results-sub {
  font-size: 1rem;
  color: #777;
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.6;
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.match-card {
  background: #fff;
  border: 1.5px solid #e8e2da;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s, box-shadow 0.25s;
  animation: fade-up 0.5s ease both;
}

.match-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}

.match-rank {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 1.4rem;
  line-height: 1;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.match-img-wrap {
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}

.match-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.match-card:hover .match-img-wrap img {
  transform: scale(1.04);
}

.match-body {
  padding: 1.2rem 1.2rem 0.5rem;
  flex: 1;
}

.match-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent, #8a6a4e);
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.match-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
  color: var(--black, #1a1a1a);
}

.match-breed {
  font-size: 0.82rem;
  color: #999;
  margin-bottom: 0.5rem;
}

.match-snippet {
  font-size: 0.88rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

/* Compat bar */
.match-compat {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.compat-label {
  font-size: 0.75rem;
  color: #aaa;
  font-weight: 500;
  white-space: nowrap;
}

.compat-bar-bg {
  flex: 1;
  height: 5px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.compat-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent, #8a6a4e), #c9956a);
  border-radius: 10px;
  transition: width 0.8s ease;
}

.compat-pct {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent, #8a6a4e);
  min-width: 36px;
}

/* Trait icons */
.match-traits {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.trait {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.trait-icons {
  display: flex;
  gap: 1px;
  font-size: 0.8rem;
}

.trait-icons span {
  opacity: 0.15;
  transition: opacity 0.2s;
}

.trait-icons .trait-lit {
  opacity: 1;
}

.trait-label {
  font-size: 0.65rem;
  color: #bbb;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
}

/* Adopt button */
.match-adopt-btn {
  display: block;
  width: calc(100% - 2.4rem);
  margin: 0 1.2rem 1.2rem;
  padding: 0.7rem;
  background: var(--black, #1a1a1a);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  letter-spacing: 0.03em;
}

.match-adopt-btn:hover {
  background: var(--accent, #8a6a4e);
  transform: translateY(-1px);
}

/* Results actions */
.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.retake-btn {
  background: transparent;
  border: 1.5px solid #d0c9c0;
  color: #666;
  padding: 0.8rem 2rem;
  border-radius: 100px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.retake-btn:hover {
  border-color: var(--black, #1a1a1a);
  color: var(--black, #1a1a1a);
}

.browse-all-btn {
  background: var(--black, #1a1a1a);
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 100px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s;
}

.browse-all-btn:hover {
  background: var(--accent, #8a6a4e);
}

/* ─────────────────────────────────────────
   TRANSITIONS
───────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-q-enter-active,
.slide-q-leave-active {
  transition: all 0.3s ease;
}

.slide-q-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-q-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* ─────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────── */
@media (max-width: 600px) {
  .paw-step {
    margin: 0 0.3rem;
  }
  .paw-icon {
    width: 26px;
    height: 26px;
  }
  .q-choices {
    grid-template-columns: 1fr 1fr;
  }
  .matches-grid {
    grid-template-columns: 1fr;
  }
}
</style>
