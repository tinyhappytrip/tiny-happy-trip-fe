<template>
  <div id="app" class="section-container">
    <div style="width: 100vw; height: 100%">
      <video style="width: 100%; height: 100%; object-fit: none" autoPlay muted loop>
        <source src="@/assets/main/spring4.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="overlay">
      <div class="block">
        <h2><span style="color: beige;">소소하고</span> <span style="color: beige">확실한</span> <span style="color: beige">여행</span></h2>
        <h1 style="font-size: 3rem; margin-bottom: 20px">당신의 이야기를 써보세요</h1>
      </div>
      <div class="button" v-if="isLoggedIn" @click="showModal('story')">작성하기</div>
      <RouterLink to="/login">
        <div class="button" v-if="!isLoggedIn">로그인</div>
      </RouterLink>
      <div class="next-button-box">
        <font-awesome-icon class="next last" :icon="['fas', 'chevron-down']" @click="nextSection" />
      </div>
    </div>
    <StoryWrite :isVisible="isStoryModalVisible" @update:isVisible="isStoryModalVisible = $event" />
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import StoryWrite from '../story/StoryWrite.vue'

const emit = defineEmits(['next-section'])

const authStore = useAuthStore()
authStore.checkAuth()

const isLoggedIn = computed(() => authStore.isLoggedIn)

const isStoryModalVisible = ref(false)

const showModal = (type) => {
  if (type === 'story') {
    isStoryModalVisible.value = true
  }
}

const nextSection = () => {
  emit('next-section')
}

onMounted(() => {
  document.documentElement.style.overflow = 'auto'
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>

<style scoped>
.section-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('https://img3.wallspic.com/previews/9/3/3/5/5/155339/155339-writer_writing-writing-writer-author-writers_block-x750.jpg') no-repeat center
    center/cover;
  opacity: 0.8;
}
/* https://get.wallhere.com/photo/books-vintage-1920x1080-px-product-design-780122.jpg */
/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStGDDNY6KDEc3BhtTVwtmW1uX09GTePkQFxvDrkQdHTA&s */
/* https://wallpapers.com/images/hd/writing-pictures-1920-x-1080-xwxmtbnqoenqlu9t.jpg */

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
}

.button {
  text-decoration: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  border: none;
  cursor: pointer;
  border: 2px solid white;
  margin-top: 30px;
  text-align: right;
}

.button:hover {
  background-color: white;
  color: black;
}

.block {
  cursor: default;
  text-align: center;
}

.block h2 {
  text-align: left;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.next-button-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 40px;
}

.next {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.last {
  margin-top: -15px;
}
</style>
