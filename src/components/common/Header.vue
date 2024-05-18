<template>
  <header class="header">
    <div class="container">
      <HeaderLogo />
      <HeaderMyMenu />
    </div>
    <HeaderMenuBar />
  </header>
</template>

<script setup>
import HeaderLogo from '../header/HeaderLogo.vue'
import HeaderMenuBar from '../header/HeaderMenuBar.vue'
import HeaderMyMenu from '../header/HeaderMyMenu.vue'
import { useAuthStore } from '@/stores/auth'
import { setCookie } from '@/util/cookie'
const authStore = useAuthStore()
const params = new URLSearchParams(window.location.search)
const paramsObj = Object.fromEntries(params.entries())
const { accessToken, refreshToken, grantType } = paramsObj
if (accessToken) {
  const data = {
    accessToken,
    refreshToken
  }
  setCookie(data)
  authStore.checkAuth()
  window.history.replaceState({}, document.title, window.location.pathname)
}
</script>

<style scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: black;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  top: 0;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: 0 auto;
}
</style>
