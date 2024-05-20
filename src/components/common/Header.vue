<template>
  <header class="header">
    <div class="container">
      <HeaderLogo />
      <HeaderMyMenu :isModalVisible="isModalVisible" @update:modalVisible="$emit('update:modalVisible', $event)" />
    </div>
    <HeaderMenuBar />
  </header>
</template>

<script setup>
import HeaderLogo from '../header/HeaderLogo.vue'
import HeaderMenuBar from '../header/HeaderMenuBar.vue'
import HeaderMyMenu from '../header/HeaderMyMenu.vue'

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    required: true
  }
})
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
  width: 1920px;
  height: 80px;
  top: 0;
  z-index: 100;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: 20px auto;
}
</style>
