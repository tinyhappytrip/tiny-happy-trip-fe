import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const routes = [
  { path: '/', name: 'main', component: () => import('@/views/MainView.vue'), meta: { layout: DefaultLayout } },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView.vue'),
    beforeEnter: (to, from, next) => {
      if (to.query.social === 'true') {
        next({ name: 'social-signup', query: to.query, replace: true })
      } else {
        next()
      }
    }
  },
  {
    path: '/signup',
    name: 'social-signup',
    component: () => import('@/views/SocialSignupView.vue'),
    meta: { layout: DefaultLayout }
  },
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
      },
      {
        path: 'write',
        name: 'story-write',
        component: () => import('@/components/story/StoryWrite.vue')
      }
    ]
  }
]
