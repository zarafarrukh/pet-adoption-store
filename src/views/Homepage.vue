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
          <path
            d="M110 95
               C70 95, 50 125, 55 155
               C60 185, 85 200, 110 200
               C135 200, 160 185, 165 155
               C170 125, 150 95, 110 95Z"
          />
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
            <img :src="category.image" :alt="category.name" class="category-img" />
            <div class="category-overlay">
              <span class="category-overlay-text">{{ category.name }}</span>
            </div>
          </div>

          <div class="category-info">
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <RouterLink
              to="/browse"
              class="card-link"
              @click="scrollToTopAfterRoute"
            >
              View {{ category.name }}
            </RouterLink>
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
          <span class="arrow">‹</span>
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
          <span class="arrow">›</span>
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

// Import category images from homepage folder
import catImg from '../assets/images/homepage/cat.jpg'
import dogImg from '../assets/images/homepage/dog.jpg'
import reptileImg from '../assets/images/homepage/reptile.jpg'
import birdImg from '../assets/images/homepage/bird.jpg'
import fishImg from '../assets/images/homepage/fish.jpg'
import hamsterImg from '../assets/images/homepage/hamster.jpeg'

// Homepage pet categories
const categories = ref([
  {
    name: 'Cats',
    description: 'Independent, affectionate, and full of personality.',
    image: catImg,
    gradient: 'linear-gradient(135deg, #f6df00, #f3c969)',
  },
  {
    name: 'Dogs',
    description: 'Loyal companions for active and loving homes.',
    image: dogImg,
    gradient: 'linear-gradient(135deg, #d8c4a8, #f1dfc8)',
  },
  {
    name: 'Reptiles',
    description: 'Unique pets for calm spaces and specialized care.',
    image: reptileImg,
    gradient: 'linear-gradient(135deg, #b6d6a5, #dff1d4)',
  },
  {
    name: 'Birds',
    description: 'Smart, social, and full of cheerful energy.',
    image: birdImg,
    gradient: 'linear-gradient(135deg, #ffd7d7, #fff0b9)',
  },
  {
    name: 'Fish',
    description: 'Peaceful aquatic companions for beautiful tank setups.',
    image: fishImg,
    gradient: 'linear-gradient(135deg, #9fd6ff, #d7efff)',
  },
  {
    name: 'Rodents',
    description: 'Small pets with big personalities and easy routines.',
    image: hamsterImg,
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

function scrollToTopAfterRoute() {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, 0)
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

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}

.homepage {
  background: #f5f0e6;
  color: #161616;
  font-family: Arial, Helvetica, sans-serif;
}

/* Shared sections */
.content-section {
  padding: 90px 80px;
  border-top: 1px solid rgba(17, 17, 17, 0.14);
}

.section-heading {
  margin-bottom: 36px;
}

.section-label {
  font-size: 0.85rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #7b6a58;
  margin-bottom: 10px;
  font-weight: 700;
}

.section-heading h2 {
  font-size: 2.2rem;
  margin: 0;
  font-weight: 900;
  line-height: 1.1;
}

/* Hero */
.hero-section {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px;
  overflow: hidden;
  background:
    linear-gradient(rgba(245, 240, 230, 0.86), rgba(245, 240, 230, 0.88)),
    linear-gradient(120deg, #fffaf1, #efe6d8);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(246, 223, 0, 0.13), transparent 45%),
    linear-gradient(300deg, rgba(102, 74, 47, 0.10), transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
}

.hero-kicker {
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.9rem;
  color: #7b6a58;
  font-weight: 700;
}

.hero-content h1 {
  font-size: 5rem;
  margin: 14px 0 10px;
  line-height: 0.95;
  font-weight: 900;
  text-transform: uppercase;
}

.hero-subtitle {
  font-size: 1.15rem;
  max-width: 620px;
  line-height: 1.7;
  color: #3b3128;
  margin-bottom: 28px;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 20px;
}

.hero-btn {
  text-decoration: none;
  border: 1px solid #111;
  padding: 14px 24px;
  font-weight: 800;
  font-size: 0.98rem;
  cursor: pointer;
}

.primary-btn {
  background: #f6df00;
  color: #111;
}

.primary-btn:hover {
  background: #111;
  color: #f6df00;
}

.secondary-btn {
  background: #d8c4a8;
  color: #111;
}

.secondary-btn:hover {
  background: #664a2f;
  color: #fff7e8;
}

.outline-btn {
  background: transparent;
  color: #111;
}

.outline-btn:hover {
  background: #111;
  color: #fff7e8;
}

.hero-svg {
  position: relative;
  z-index: 2;
  width: 280px;
  height: 280px;
  opacity: 0.16;
  margin-left: 30px;
}

.hero-svg svg {
  width: 100%;
  height: 100%;
  fill: #111;
}

/* About */
.about-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
}

.about-card {
  background: #f9f4eb;
  border: 1px solid rgba(17, 17, 17, 0.14);
  padding: 28px;
}

.about-card h3 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 14px;
  font-weight: 900;
}

.about-card p,
.about-card li {
  color: #3b3128;
  line-height: 1.7;
}

.about-card ul {
  padding-left: 18px;
  margin: 0;
}

.text-link {
  display: inline-block;
  margin-top: 16px;
  color: #111;
  font-weight: 800;
  text-decoration: none;
  border-bottom: 2px solid #f6df00;
}

/* Categories */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.category-card {
  background: #fffaf1;
  border: 1px solid rgba(17, 17, 17, 0.16);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(17, 17, 17, 0.12);
}

.category-visual {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.category-card:hover .category-img {
  transform: scale(1.08);
}

.category-overlay {
  position: absolute;
  inset: 0;
  background: rgba(17, 17, 17, 0.18);
  display: flex;
  align-items: end;
  justify-content: start;
  padding: 16px;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.category-card:hover .category-overlay {
  opacity: 1;
}

.category-overlay-text {
  background: rgba(246, 223, 0, 0.95);
  color: #111;
  font-weight: 900;
  padding: 8px 12px;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.category-info {
  padding: 20px;
}

.category-info h3 {
  margin: 0 0 10px;
  font-size: 1.4rem;
  font-weight: 900;
}

.category-info p {
  margin-bottom: 14px;
  color: #4c4034;
  line-height: 1.6;
}

.card-link {
  text-decoration: none;
  color: #111;
  font-weight: 800;
  border-bottom: 2px solid #f6df00;
}

/* Testimonials */
.testimonials-section {
  background: #efe6d8;
}

.testimonial-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.carousel-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f6df00;
  border: 2px solid #111;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
}

.carousel-btn:hover {
  background: #111;
  transform: scale(1.05);
}

.carousel-btn:hover .arrow {
  color: #f6df00;
}

.arrow {
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1;
  color: #111;
}

.testimonial-card {
  max-width: 760px;
  min-height: 260px;
  background: #fffaf1;
  border: 1px solid rgba(17, 17, 17, 0.16);
  padding: 32px;
  text-align: center;
}

.quote-mark {
  font-size: 4rem;
  line-height: 1;
  margin: 0;
  color: #664a2f;
}

.testimonial-text {
  font-size: 1.12rem;
  line-height: 1.8;
  color: #352b22;
  margin: 0 0 18px;
}

.testimonial-card h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 900;
}

.testimonial-pet {
  color: #7b6a58;
  font-weight: 700;
  margin-top: 8px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 22px;
}

.dot {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: #c8b8a2;
  cursor: pointer;
}

.dot.active {
  background: #111;
}

/* Ethics */
.ethics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.ethics-card {
  background: #fffaf1;
  border-left: 6px solid #f6df00;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(17, 17, 17, 0.04);
}

.ethics-card h3 {
  margin-top: 0;
  font-size: 1.35rem;
  font-weight: 900;
}

.ethics-card p {
  color: #43372d;
  line-height: 1.7;
}

/* Contact */
.contact-section {
  padding: 90px 80px;
  background: linear-gradient(90deg, #22160b, #3a2410);
  color: #fff3db;
}

.contact-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  align-items: start;
}

.contact-text {
  line-height: 1.8;
  color: #f3e6d0;
}

.contact-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 243, 219, 0.22);
  padding: 24px;
}

.contact-card p {
  margin: 0 0 12px;
  color: #f3e6d0;
}

/* Responsive */
@media (max-width: 1100px) {
  .hero-content h1 {
    font-size: 4rem;
  }

  .categories-grid,
  .ethics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-grid,
  .contact-inner {
    grid-template-columns: 1fr;
  }

  .hero-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }

  .hero-svg {
    width: 200px;
    height: 200px;
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .content-section,
  .hero-section,
  .contact-section {
    padding-left: 24px;
    padding-right: 24px;
  }

  .categories-grid,
  .ethics-grid {
    grid-template-columns: 1fr;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .testimonial-carousel {
    flex-direction: column;
  }

  .carousel-btn {
    width: 52px;
    height: 52px;
  }

  .arrow {
    font-size: 2rem;
  }
}
</style>