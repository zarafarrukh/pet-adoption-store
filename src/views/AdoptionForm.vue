<template>
  <div class="adoption-page">
    <div class="header-section">
      <h2>Adoption Application Form</h2>
      <p class="subtitle">Please provide detailed information to help us find the perfect match.</p>
    </div>

    <form @submit.prevent="submitForm" class="adoption-form">
      
      <div class="form-section">
        <h3>1. Personal Details</h3>
        <input 
          v-model="form.applicantName" 
          placeholder="Full Name" 
          required 
          @focus="logEvent('focus', 'applicantName')"
        />
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="Email Address" 
          required 
          @focus="logEvent('focus', 'email')"
        />
        <input 
          v-model="form.phone" 
          type="tel" 
          placeholder="Phone Number (e.g. 905-555-0123)" 
          required 
          @focus="logEvent('focus', 'phone')"
        />
        <input 
          v-model="form.address" 
          placeholder="Home Address" 
          required 
          @focus="logEvent('focus', 'address')"
        />
      </div>

      <div class="form-section">
        <h3>2. Household & Experience</h3>
        <select v-model="form.petId" required @change="logEvent('change', 'petSelection')">
          <option value="" disabled>Select the pet you are interested in</option>
          <option v-for="pet in PETS" :key="pet.id" :value="pet.id">
            {{ pet.name }} ({{ pet.breed }})
          </option>
        </select>

        <select v-model="form.experience" required @change="logEvent('change', 'experienceLevel')">
          <option value="" disabled>Previous pet ownership experience?</option>
          <option value="first-time">First-time owner</option>
          <option value="experienced">Have owned pets before</option>
          <option value="expert">Experienced with this specific breed</option>
        </select>

        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="form.hasYard" @change="logEvent('toggle', 'hasYard')" />
            I have a fenced yard
          </label>
        </div>
      </div>

      <div class="form-section">
        <h3>3. Your Motivation</h3>
        <textarea 
          v-model="form.message" 
          placeholder="Tell us about your lifestyle and why you'd like to adopt this pet..."
          rows="5"
          required
          @focus="logEvent('focus', 'motivationText')"
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        :disabled="loading" 
        class="submit-btn"
        @click="logEvent('click', 'submit_button_manual')"
      >
        {{ loading ? 'Processing Application...' : 'Submit Application' }}
      </button>

      <div v-if="success" class="success-banner">
        Application sent! We will contact you shortly. 🐾
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { db } from '../firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PETS } from '../data/pets.js';

const loading = ref(false);
const success = ref(false);

const form = reactive({
  applicantName: '',
  email: '',
  phone: '',
  address: '',
  petId: '',
  experience: '',
  hasYard: false,
  message: ''
});

// --- RESEARCH LOGGING SYSTEM ---
const logEvent = (type, field) => {
  console.log(`[STUDY_LOG] Action: ${type} | Field: ${field} | Time: ${new Date().toISOString()}`);
};

const submitForm = async () => {
  if (loading.value) return; // Prevent multiple clicks during processing
  console.log("Database object check:", db);
  loading.value = true;
  logEvent('submit_start', 'adoptionForm');

  try {
    // Direct attempt to write to your Firestore 'applications' collection
    await addDoc(collection(db, "applications"), {
      ...form,
      timestamp: serverTimestamp(),
      status: 'pending'
    });
    
    success.value = true;
    logEvent('submit_success', 'adoptionForm');
    alert("Application successfully sent to Firebase! 🐾");
    
    // Reset form after a successful submission
    setTimeout(() => {
      Object.assign(form, {
        applicantName: '', email: '', phone: '', address: '', 
        petId: '', experience: '', hasYard: false, message: ''
      });
      success.value = false;
    }, 3000);

  } catch (e) {
    console.error("Critical Firebase Error: ", e);
    logEvent('submit_error', e.message);
    alert("Submission Failed: " + e.message);
  } finally {
    // This ensures the button stops saying "Processing" even if it fails
    loading.value = false;
  }
};
</script>

<style scoped>
.adoption-page { padding: 40px; max-width: 600px; margin: 0 auto; font-family: 'Barlow', sans-serif; }
.header-section { margin-bottom: 30px; text-align: center; }
h2 { text-transform: uppercase; font-weight: 900; letter-spacing: -1px; margin-bottom: 5px; }
.subtitle { color: #666; font-size: 0.9rem; }

.form-section { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 12px; }
h3 { font-size: 1rem; margin-bottom: 5px; color: #111; border-bottom: 2px solid #F9E000; display: inline-block; width: fit-content; }

input, select, textarea { 
  padding: 12px; 
  border: 1.5px solid #ddd; 
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus, select:focus, textarea:focus {
  border-color: #111;
  outline: none;
}

.checkbox-group { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; }

.submit-btn { 
  background: #111; 
  color: #F9E000; 
  padding: 18px; 
  font-weight: 800; 
  text-transform: uppercase;
  border: none; 
  cursor: pointer; 
  width: 100%;
  transition: transform 0.1s;
}

.submit-btn:active { transform: scale(0.98); }
.submit-btn:disabled { background: #666; cursor: not-allowed; }

.success-banner { 
  margin-top: 20px; 
  padding: 15px; 
  background: #E2EFDA; 
  color: #385723; 
  text-align: center; 
  font-weight: bold; 
  border-radius: 4px;
}
</style>