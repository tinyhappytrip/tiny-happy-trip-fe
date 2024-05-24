<template>
  <div class="container">
    <div class="tabs">
      <div class="tab" :class="{ active: activeTab === 'story' }" @click="setActiveTab('story')">이야기</div>
      <div class="tab" :class="{ active: activeTab === 'collection' }" @click="setActiveTab('collection')">모음집</div>
      <div class="tab result">게시물 {{ searchCount }} 개</div>
    </div>
    <div class="tab-content">
      <StoryLikeManage v-if="activeTab === 'story'" @set-search-count="setSearchCount" ref="storyManage" />
      <CollectionLikeManage v-if="activeTab === 'collection'" @set-search-count="setSearchCount" ref="collectionManage" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, computed, inject, defineModel } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import StoryLikeManage from '@/components/mypage/StoryLikeManage.vue'
import CollectionLikeManage from '@/components/mypage/CollectionLikeManage.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const activeTab = ref('story')
const authStore = useAuthStore()
const searchCount = ref(0)
const user = props.user

const Swal = inject('$swal')

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const setSearchCount = (count) => {
  searchCount.value = count
}

watch(
  () => props.user,
  (newUser) => {
    user.value = newUser
  },
  { immediate: true }
)
</script>

<style scoped>
.container {
  /* height: 627px; */
  min-width: 800px;
}
.tabs {
  display: flex;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s, background-color 0.6s;
}

.tab:not(.result):hover {
  background-color: #f0f0f0;
}

.tab.active {
  border-bottom: 2px solid black;
  color: black;
  font-weight: bold;
}

.tab.result {
  margin-left: auto;
  cursor: default;
}

.tab-content {
  min-width: 800px;
  font-size: 18px;
  height: 70vh;
}

.label {
  font-weight: bold;
  color: #0c081e;
  text-align: center;
  width: 100%;
}

.description {
  font-size: 14px;
  color: #777;
  text-align: center;
  width: 100%;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
}

.submit-btn {
  width: 50%;
  background-color: #af8f6f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.submit-btn.active {
  background-color: #af8f6f;
}

.submit-btn.inactive {
  background-color: #555;
}

.submit-btn:hover:not(:disabled) {
  background-color: #74512d;
}
</style>

<style>
.swal2-container {
  top: 8% !important;
  width: 20% !important;
}

.swal2-toast {
  background-color: rgb(47, 52, 56) !important;
  width: 100%;
  color: white;
  display: flex !important;
  align-items: center !important;
  height: 50px;
  font-size: 0.9rem;
}
</style>
