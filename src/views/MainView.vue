<template>
  <v-app>
    <Header class="header" :isModalVisible="isModalVisible" @update:modalVisible="isModalVisible = $event" />
    <div ref="container" class="scroll-container"></div>
  </v-app>
  <Modal :visible="isModalVisible" @update:visible="isModalVisible = $event" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue'
import Header from '@/components/common/Header.vue'

const isModalVisible = ref(false)
</script>

<style scoped>
h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

v-app-bar,
v-footer {
  background-color: #42b983;
}

v-card {
  margin-top: 20px;
}

v-divider {
  margin: 20px 0;
}
</style>
