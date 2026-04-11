<template>
  <div class="homepage">
    <!-- Hero -->
    <section id="hero" class="hero-section">
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <p class="hero-kicker">Find your perfect companion</p>
        <h1>PawMatch</h1>
        <p class="hero-subtitle">
          Adopt with care, explore pet categories, take the pet matcher quiz,
          and shop essentials for your future best friend.
        </p>

        <!-- Main homepage buttons -->
        <div class="hero-buttons">
          <RouterLink to="/browse" class="hero-btn primary-btn">Browse Pets</RouterLink>
          <RouterLink to="/merch" class="hero-btn secondary-btn">Paw-tique Shop</RouterLink>
          <RouterLink to="/quiz" class="hero-btn outline-btn">Pet Quiz</RouterLink>
          <RouterLink to="/browse" class="hero-btn primary-btn">Adopt Now</RouterLink>
        </div>
      </div>

      <!-- Decorative SVG paw -->
      <div class="hero-svg">
        <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="60" cy="60" r="18" />
          <circle cx="105" cy="40" r="18" />
          <circle cx="150" cy="60" r="18" />
          <circle cx="170" cy="105" r="18" />
          <path d="M110 95
                   C70 95, 50 125, 55 155
                   C60 185, 85 200, 110 200
                   C135 200, 160 185, 165 155
                   C170 125, 150 95, 110 95Z" />
        </svg>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="content-section about-section">
      <div class="section-heading">
        <p class="section-label">ABOUT PAWMATCH</p>
        <h2>Helping people and pets find the right match</h2>
      </div>

      <div class="about-grid">
        <div class="about-card large-card">
          <h3>More than a pet adoption website</h3>
          <p>
            PawMatch helps users explore adoptable pets, learn what type of animal suits
            their lifestyle, and adopt more responsibly. Whether you are looking for a
            playful dog, a calm reptile, a social bird, or a small pocket pet, PawMatch
            makes the search more thoughtful and personal.
          </p>

          <RouterLink to="/quiz" class="text-link">
            Go to the PetMatcher Quiz →
          </RouterLink>
        </div>

        <div class="about-card small-card">
          <h3>What you can do here</h3>
          <ul>
            <li>Browse adoptable animals by category</li>
            <li>Learn through detailed pet profiles</li>
            <li>Use the PetMatcher quiz</li>
            <li>Read owner testimonials</li>
            <li>Shop for pet toys, treats, and merch</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section id="categories" class="content-section categories-section">
      <div class="section-heading">
        <p class="section-label">PET CATEGORIES</p>
        <h2>Explore animals by type</h2>
      </div>

      <div class="categories-grid">
        <div
          v-for="category in categories"
          :key="category.name"
          class="category-card"
        >
          <div class="category-visual" :style="{ background: category.gradient }">
            <span class="category-emoji">{{ category.emoji }}</span>
          </div>

          <div class="category-info">
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <RouterLink to="/browse" class="card-link">View {{ category.name }}</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials carousel -->
    <section id="testimonials" class="content-section testimonials-section">
      <div class="section-heading">
        <p class="section-label">HAPPY ADOPTIONS</p>
        <h2>What pet owners are saying</h2>
      </div>

      <div class="testimonial-carousel">
        <button class="carousel-btn" @click="prevTestimonial" aria-label="Previous testimonial">
          ←
        </button>

        <div class="testimonial-card">
          <p class="quote-mark">“</p>
          <p class="testimonial-text">
            {{ testimonials[currentTestimonial].quote }}
          </p>
          <h3>{{ testimonials[currentTestimonial].name }}</h3>
          <p class="testimonial-pet">
            Adopted {{ testimonials[currentTestimonial].pet }}
          </p>
        </div>

        <button class="carousel-btn" @click="nextTestimonial" aria-label="Next testimonial">
          →
        </button>
      </div>

      <div class="carousel-dots">
        <button
          v-for="(item, index) in testimonials"
          :key="item.name"
          class="dot"
          :class="{ active: currentTestimonial === index }"
          @click="currentTestimonial = index"
          :aria-label="`Go to testimonial ${index + 1}`"
        ></button>
      </div>
    </section>

    <!-- Ethics -->
    <section id="ethics" class="content-section ethics-section">
      <div class="section-heading">
        <p class="section-label">ETHICS & CARE</p>
        <h2>Where our pets come from</h2>
      </div>

      <div class="ethics-grid">
        <div class="ethics-card">
          <h3>Rescue-first approach</h3>
          <p>
            PawMatch prioritizes shelter and rescue partnerships, helping animals in need
            find loving homes before encouraging other sourcing routes.
          </p>
        </div>

        <div class="ethics-card">
          <h3>Health and vetting</h3>
          <p>
            Our featured pets are health-checked, monitored, and matched with homes based
            on temperament, care needs, and responsible ownership.
          </p>
        </div>

        <div class="ethics-card">
          <h3>Responsible adoption</h3>
          <p>
            We encourage informed decisions through educational resources, pet profiles,
            matching tools, and support for first-time adopters.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact section -->
    <section id="contact" class="contact-section">
      <div class="contact-inner">
        <div>
          <p class="section-label">CONTACT</p>
          <h2>Questions before adopting?</h2>
          <p class="contact-text">
            Reach out to us for general adoption questions, care concerns, or support
            finding the right pet for your home and lifestyle.
          </p>
        </div>

        <div class="contact-card">
          <p><strong>Email:</strong> hello@pawmatch.com</p>
          <p><strong>Phone:</strong> (905) 555-PAWS</p>
          <p><strong>Location:</strong> Ontario, Canada</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

// Homepage pet categories
const categories = ref([
  {
    name: 'Cats',
    description: 'Independent, affectionate, and full of personality.',
    emoji: '🐱',
    gradient: 'linear-gradient(135deg, #f6df00, #f3c969)',
  },
  {
    name: 'Dogs',
    description: 'Loyal companions for active and loving homes.',
    emoji: '🐶',
    gradient: 'linear-gradient(135deg, #d8c4a8, #f1dfc8)',
  },
  {
    name: 'Reptiles',
    description: 'Unique pets for calm spaces and specialized care.',
    emoji: '🦎',
    gradient: 'linear-gradient(135deg, #b6d6a5, #dff1d4)',
  },
  {
    name: 'Birds',
    description: 'Smart, social, and full of cheerful energy.',
    emoji: '🐦',
    gradient: 'linear-gradient(135deg, #ffd7d7, #fff0b9)',
  },
  {
    name: 'Fish',
    description: 'Peaceful aquatic companions for beautiful tank setups.',
    emoji: '🐠',
    gradient: 'linear-gradient(135deg, #9fd6ff, #d7efff)',
  },
  {
    name: 'Rodents',
    description: 'Small pets with big personalities and easy routines.',
    emoji: '🐹',
    gradient: 'linear-gradient(135deg, #ecd9c6, #fff1e1)',
  },
])

// Testimonial data
const testimonials = ref([
  {
    name: 'Maya T.',
    pet: 'a rescue cat named Luna',
    quote:
      'PawMatch made the adoption process feel thoughtful and easy. I loved how clean the website was and the quiz genuinely helped me decide what was right for me.',
  },
  {
    name: 'Daniel R.',
    pet: 'a beagle named Buster',
    quote:
      'Browsing the site felt simple and organized, and the information made me feel way more confident about adopting instead of rushing into it.',
  },
  {
    name: 'Sarah K.',
    pet: 'a bunny named Mochi',
    quote:
      'I originally thought I wanted a dog, but the pet quiz helped me realize a rabbit fit my lifestyle much better. I am so happy I found Mochi.',
  },
])

const currentTestimonial = ref(0)
let testimonialInterval = null

function nextTestimonial() {
  currentTestimonial.value =
    (currentTestimonial.value + 1) % testimonials.value.length
}

function prevTestimonial() {
  currentTestimonial.value =
    (currentTestimonial.value - 1 + testimonials.value.length) % testimonials.value.length
}

// Auto-rotate testimonials
onMounted(() => {
  testimonialInterval = setInterval(() => {
    nextTestimonial()
  }, 5000)
})

onBeforeUnmount(() => {
  if (testimonialInterval) clearInterval(testimonialInterval)
})
</script>

<style>
:root {
  scroll-behavior: smooth;
}
</style>