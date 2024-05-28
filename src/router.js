import { createMemoryHistory, createRouter } from 'vue-router'

import MapView from './view/MapView.vue'
import AboutView from './view/AboutView.vue'

const routes = [
  { path: '/', component: MapView },
  { path: '/about', component: AboutView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router