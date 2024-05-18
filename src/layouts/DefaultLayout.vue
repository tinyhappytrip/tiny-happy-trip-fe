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

<style>
.v-application__wrap {
  min-height: 0 !important;
  padding-top: 80px;
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
