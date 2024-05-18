<template>
  <div class="user-profile">
    <img :src="profileImage" alt="Profile Image" class="profile-image" />
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const profileImage = ref('../assets/profile.jpg')
const name = ref('홍길동')
const description = ref('한 줄 설명이 여기에 들어갑니다.')
</script>

<style scoped>
.user-profile {
  text-align: center;
}
.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
