<template>
  <div class="my">
    <template v-if="isLoggedIn">
      <div class="image-box" @click="openModal">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="2xl" class="icon" />
      </div>

      <div class="image-box" @click.stop="togglePlusDropdown">
        <font-awesome-icon :icon="['far', 'square-plus']" size="2xl" class="icon" />
        <transition name="slide">
          <div v-if="isPlusDropdownVisible" class="dropdown-menu plus">
            <RouterLink to="/story/write" class="dropdown-item">이야기</RouterLink>
            <RouterLink to="/collection/write" class="dropdown-item">모음집</RouterLink>
          </div>
        </transition>
      </div>
      <div class="image-box">
        <RouterLink to="/messenger">
          <font-awesome-icon :icon="['far', 'paper-plane']" size="2xl" class="icon" />
        </RouterLink>
      </div>
      <div v-if="isLoggedIn && userImage" class="my-image-box" @click.stop="toggleProfileDropdown">
        <img :src="`http://localhost:8080/image?path=${userImage}`" />
        <transition name="slide">
          <div v-if="isProfileDropdownVisible" class="dropdown-menu">
            <RouterLink :to="`/profile/${userId}`" class="dropdown-item">프로필</RouterLink>
            <RouterLink :to="`/mypage/${userId}`" class="dropdown-item">마이페이지</RouterLink>
            <div class="dropdown-item" @click="logout">로그아웃</div>
          </div>
        </transition>
      </div>
    </template>

    <template v-else>
      <div class="login-box">
        <RouterLink to="/login" class="to-login">로그인</RouterLink>
        <RouterLink to="/signup" class="to-login">회원가입</RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['update:modalVisible'])
const isProfileDropdownVisible = ref(false)
const isPlusDropdownVisible = ref(false)

const toggleProfileDropdown = () => {
  isProfileDropdownVisible.value = !isProfileDropdownVisible.value
  isPlusDropdownVisible.value = false
}

const togglePlusDropdown = () => {
  isPlusDropdownVisible.value = !isPlusDropdownVisible.value
  isProfileDropdownVisible.value = false
}

const openModal = () => {
  emit('update:modalVisible', true)
}

const logout = () => {
  authStore.logout()
  isProfileDropdownVisible.value = false
  isPlusDropdownVisible.value = false
  location.href = '/'
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.my-image-box') && !event.target.closest('.image-box')) {
    isProfileDropdownVisible.value = false
    isPlusDropdownVisible.value = false
  }
}

const authStore = useAuthStore()
authStore.checkAuth()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const userId = computed(() => authStore.userId)
const userImage = computed(() => authStore.userImage)

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
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
  width: 20%;
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
  width: 50px;
  height: 50px;
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

.plus {
  top: 55px;
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
  transition: transform 0.3s ease, opacity 0.2s ease;
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

.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 100%;
}

.to-login {
  z-index: 9999;
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 30px;
}
</style>
