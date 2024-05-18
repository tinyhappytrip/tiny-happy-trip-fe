<template>
  <div class="tabs">
    <div class="tab" :class="{ active: activeTab === 'story' }" @click="activeTab = 'story'">이야기</div>
    <div class="tab" :class="{ active: activeTab === 'collection' }" @click="activeTab = 'collection'">모음집</div>
    <div class="tab" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">사용자</div>
    <div class="tab result">검색결과 {?} 개</div>
  </div>
  <div class="tab-content">
    <component :is="currentTabComponent"></component>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SearchStory from '@/components/search/SearchStory.vue'
import SearchCollection from '@/components/search/SearchCollection.vue'
import SearchUser from '@/components/search/SearchUser.vue'

const activeTab = ref('story')

const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 'story':
      return SearchStory
    case 'collection':
      return SearchCollection
    case 'users':
      return SearchUser
    default:
      return null
  }
})
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
  width: 40%;
  margin: 0 auto;
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
  width: 50%;
  margin: 30px auto;
  font-size: 18px;
  overflow-y: auto;
  height: 70vh;
}
</style>
