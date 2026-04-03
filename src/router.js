import { createRouter, createWebHashHistory } from 'vue-router'
import Homepage from './views/Homepage.vue'
import BrowsePets from './views/BrowsePets.vue'
import MerchStore from './views/MerchStore.vue'

const routes = [
  { path: '/', component: Homepage },
  { path: '/browse', component: BrowsePets },
  { path: '/merch', component: MerchStore },
  // { path: '/quiz', component: PetQuiz },
  // { path: '/home', component: Homepage }, 
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})