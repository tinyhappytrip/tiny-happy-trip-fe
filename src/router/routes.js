import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { components } from 'vuetify/dist/vuetify-labs.js'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
function perRouteGuardForCheckLogin(to, from) {
  const authStore = useAuthStore()
  const Swal = inject('$swal')
  const showToast = () => {
    Swal.fire({
      text: '로그인해주세요!',
      icon: 'error',
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        container: 'custom-swal'
      }
    })
  }

  console.log(`from: ${from.path} => to: ${to.path}`)
  if (authStore.isLoggedIn) {
    console.log('로그인 되어 있음 ')
    return true
  } else {
    showToast()
    const router = useRouter()
    router.push('/login')
    return false
  }
}
export const routes = [
  { path: '/', name: 'main', component: () => import('@/views/MainView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/signup', name: 'signup', component: () => import('@/views/SignupView.vue') },
  { path: '/find', name: 'find', component: () => import('@/views/FindView.vue'), meta: { layout: DefaultLayout }, beforeEnter: [perRouteGuardForCheckLogin] },
  {
    path: '/profile/:userId',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { layout: DefaultLayout }
  },
  {
    path: '/mypage/:userId',
    name: 'mypage',
    component: () => import('@/views/MyPageView.vue'),
    meta: { layout: DefaultLayout },
    beforeEnter: [perRouteGuardForCheckLogin],
    children: [
      {
        path: '',
        name: 'menu',
        component: () => import('@/components/mypage/MyPageMenu.vue')
      }
    ]
  },

  {
    path: '/story',
    name: 'story',
    meta: { layout: DefaultLayout },
    component: () => import('@/views/StoryView.vue'),
    beforeEnter: [perRouteGuardForCheckLogin],
    children: [
      {
        path: '',
        name: 'story-list',
        component: () => import('@/components/story/StoryList.vue')
      },
      {
        path: ':storyId',
        name: 'story-detail',
        component: () => import('@/components/story/StoryDetail.vue')
      }
    ]
  },
  {
    path: '/collection',
    name: 'collection',
    meta: { layout: DefaultLayout },
    beforeEnter: [perRouteGuardForCheckLogin],
    component: () => import('@/views/CollectionView.vue'),
    children: [
      {
        path: '',
        name: 'collection-list',
        component: () => import('@/components/collection/CollectionSwiper.vue')
      },
      {
        path: ':collectionId',
        name: 'collection-detail',
        component: () => import('@/components/collection/CollectionDetail.vue')
      }
    ]
  },
  { path: '/messenger', name: 'messenger', component: () => import('@/views/MessengerView.vue'), meta: { layout: DefaultLayout } },
  { path: '/map', name: 'map', component: () => import('@/views/MapView.vue'), meta: { layout: DefaultLayout } }
]
