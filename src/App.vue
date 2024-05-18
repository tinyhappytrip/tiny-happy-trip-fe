<template>
  <div :class="{'modal-background' : !computedShowModal}"></div>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useModalStore } from './stores/modal';

    const route = useRoute()
    const layout = computed(() => {
      return route.meta.layout || 'div'
    })
    const modalStore = useModalStore();
    const showModal = ref(modalStore.getModal());

    const computedShowModal = computed(() => {
      return modalStore.getModal;
    })

  computedShowModal.value = false;
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=IBM+Plex+Sans+KR&family=Jua&display=swap');

#app {
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-weight: 500;
  font-style: normal;
}

.modal-background {
    z-index: 500;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex}
</style>
