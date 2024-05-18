<template>
  <div class="logo">
    <RouterLink class="home-link" to="/">
      <div class="logo-box">
        <img src="@/assets/main/logo.png" />
      </div>
      <div>소확행</div>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.logo {
  z-index: 999;
  cursor: pointer;
}

.logo .logo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.logo img {
  width: 50px;
}

.logo .home-link {
  font-size: 1.8rem;
}

.home-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
}
</style>
