import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { routes } from './routes'
import { subscribeNotification, connectWebSocket, unsubscribeNotification } from '@/util/web-socket'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.checkAuth()

  if (authStore.isLoggedIn) {
    authStore.checkAuth()
  }
  next()
})

export default router
