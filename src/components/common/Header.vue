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
  height: 100px;
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
