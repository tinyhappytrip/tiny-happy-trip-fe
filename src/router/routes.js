import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const routes = [
  { path: '/', name: 'main', component: () => import('@/views/MainView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/signup', name: 'signup', component: () => import('@/views/SignupView.vue') },
  { path: '/find', name: 'find', component: () => import('@/views/FindView.vue'), meta: { layout: DefaultLayout } },
  { path: '/mypage/:userId', name: 'mypage', component: () => import('@/views/MyPageView.vue'), meta: { layout: DefaultLayout } },
  { path: '/profile/:userId', name: 'profile', component: () => import('@/views/ProfileView.vue'), meta: { layout: DefaultLayout } },
  {
    path: '/story',
    name: 'story',
    meta: { layout: DefaultLayout },
    component: () => import('@/views/StoryView.vue'),
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
