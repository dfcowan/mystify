import { createRouter, createWebHashHistory } from 'vue-router'
import MystifyView from './views/MystifyView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mystify',
      name: 'Mystify',
      meta: {
        title: 'Mystify',
      },
      component: MystifyView,
    },
  ],
})

export default router
