<template>
  <div class="my">
    <div class="image-box" @click="openModal">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="2xl" class="icon" />
    </div>
    <div class="image-box">
      <RouterLink to="/story/write">
        <font-awesome-icon :icon="['far', 'square-plus']" size="2xl" class="icon" />
      </RouterLink>
    </div>
    <div class="image-box">
      <font-awesome-icon :icon="['far', 'paper-plane']" size="2xl" class="icon" />
    </div>
    <div v-if="!isLoggedIn" class="image-box">
      <RouterLink to="/login">
        <font-awesome-icon :icon="['fas', 'right-to-bracket']" size="2xl" class="icon" />
      </RouterLink>
    </div>
    <div v-if="isLoggedIn" class="my-image-box" @click.stop="toggleDropdown">
      <img src="@/assets/main/poorin.png" />
      <transition name="slide">
        <div v-if="isDropdownVisible" class="dropdown-menu">
          <RouterLink :to="`/profile/2`" class="dropdown-item">프로필</RouterLink>
          <RouterLink :to="`/mypage/${userId}`" class="dropdown-item">마이페이지</RouterLink>
          <div class="dropdown-item" @click="logout">로그아웃</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.checkAuth()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const userId = computed(() => authStore.userId)
const userImage = computed(() => authStore.userImage)
const isDropdownVisible = ref(false)

const emit = defineEmits(['update:modalVisible'])

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const openModal = () => {
  emit('update:modalVisible', true)
}

const logout = () => {
  authStore.logout()
  isDropdownVisible.value = false
  location.href = '/'
}

function handleClick(event) {
  isDropdownVisible.value = false
}

onMounted(() => {
  window.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClick)
})
</script>

<style scoped>
.icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}
.my {
  width: 20%;
  display: flex;
  justify-content: space-between;
}

.image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 25%;
}

img {
  width: 35px;
  height: 35px;
}

.my-image-box {
  z-index: 999;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
}

.my-image-box img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  width: 100px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
}

.dropdown-item {
  cursor: pointer;
  text-decoration: none;
  color: black;
  display: block;
  width: 100%;
  margin: 5px auto;
  padding: 10px 11px;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
