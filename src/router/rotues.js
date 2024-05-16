import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const routes = [
  { path: '/', name: 'main', meta: { layout: DefaultLayout }, component: () => import('@/views/MainView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/signup', name: 'signup', meta: { layout: DefaultLayout }, component: () => import('@/views/SignupView.vue') },
  { path: '/find', name: 'find', meta: { layout: DefaultLayout }, component: () => import('@/views/FindView.vue') }
]
