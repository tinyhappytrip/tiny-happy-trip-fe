<template>
  <v-app>
    <Header :isModalVisible="isModalVisible" @update:modalVisible="isModalVisible = $event" />
    <v-main style="--v-layout-bottom: 0px">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
  <Modal :visible="isModalVisible" @update:visible="isModalVisible = $event" />
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import Modal from '@/components/common/Modal.vue'

const isModalVisible = ref(false)
</script>

<style scoped>
.v-application__wrap {
  min-height: 0 !important;
}

html::-webkit-scrollbar {
  width: 0.6em;
  height: 0.6em;
}

html::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

html::-webkit-scrollbar-track {
  background: transparent;
}
</style>

<style>
.v-application__wrap {
  width: 100%;
  overflow: hidden;
}
.v-main {
  background-color: #f8f4e1;
  width: 100%;
}
.v-footer {
  width: 100%;
}
</style>

<style>
html::-webkit-scrollbar {
  width: 0.6em;
  height: 0.6em;
}

html::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

html::-webkit-scrollbar-track {
  background: transparent;
}
</style>
