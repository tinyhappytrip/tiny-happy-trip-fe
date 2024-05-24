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
import './styles/swal.css'
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
/* @import url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/Ownglyph_jooreeletter-Rg.woff2');

#app {
  font-family: 'Ownglyph_jooreeletter-Rg';
  font-weight: 500;
  font-style: normal;
  height: 100%;
} */
@font-face {
  font-family: 'KCC-Hanbit';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/KCC-Hanbit.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
#app {
  font-weight: 500;
  font-family: 'KCC-Hanbit';
  font-style: normal;
  /* font-size: 25px; */
}

div::-webkit-scrollbar {
  width: 0.6em;
  height: 0.6em;
}

div::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

ul::-webkit-scrollbar {
  width: 0.6em;
  height: 0.6em;
}

ul::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

ul::-webkit-scrollbar-track {
  background: transparent;
}
</style>
