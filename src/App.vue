<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { setCookie } from './util/cookie'

const router = useRouter()
const authStore = useAuthStore()
const route = useRoute()

const handleAuthFromUrl = () => {
  const params = new URLSearchParams(window.location.search)
  const paramsObj = Object.fromEntries(params.entries())
  const { accessToken, refreshToken } = paramsObj
  if (accessToken) {
    const data = {
      accessToken,
      refreshToken
    }
    setCookie(data)
    authStore.checkAuth()

    router.replace('/')
  }
}

const layout = computed(() => {
  return route.meta.layout || 'div'
})

onMounted(() => {
  handleAuthFromUrl()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=IBM+Plex+Sans+KR&family=Jua&display=swap');

#app {
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-weight: 500;
  font-style: normal;
}
</style>
