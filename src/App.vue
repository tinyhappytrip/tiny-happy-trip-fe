<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = computed(() => {
  return route.meta.layout || 'div'
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=IBM+Plex+Sans+KR&family=Jua&display=swap');

#app {
  text-align: center;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-weight: 500;
  font-style: normal;
}
</style>
