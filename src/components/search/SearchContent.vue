<template>
  <div class="tabs">
    <div class="tab" :class="{ active: activeTab === 'story' }" @click="setActiveTab('story')">이야기</div>
    <div class="tab" :class="{ active: activeTab === 'collection' }" @click="setActiveTab('collection')">모음집</div>
    <div class="tab" :class="{ active: activeTab === 'users' }" @click="setActiveTab('users')">사용자</div>
    <div class="tab result">검색결과 {{ searchCount }} 개</div>
  </div>
  <div class="tab-content">
    <SearchStory v-if="activeTab === 'story'" @set-search-count="setSearchCount" ref="searchStory" :search-keyword="searchKeyword" />
    <SearchCollection v-if="activeTab === 'collection'" @set-search-count="setSearchCount" ref="searchCollection" :search-keyword="searchKeyword" />
    <SearchUser v-if="activeTab === 'users'" @set-search-count="setSearchCount" ref="searchUser" :search-keyword="searchKeyword" />
  </div>
</template>

<script setup>
import { ref, computed, defineExpose, getCurrentInstance, nextTick } from 'vue'
import SearchStory from '@/components/search/SearchStory.vue'
import SearchCollection from '@/components/search/SearchCollection.vue'
import SearchUser from '@/components/search/SearchUser.vue'

const props = defineProps({
  searchKeyword: {
    type: String
  }
})

const activeTab = ref('story')
const searchCount = ref(0)

const { proxy } = getCurrentInstance()

const searchByKeywordFromComponent = (keyword) => {
  console.log(keyword)
  nextTick(() => {
    let component;
    if (activeTab.value === 'story') {
      component = proxy.$refs.searchStory
    } else if (activeTab.value === 'collection') {
      component = proxy.$refs.searchCollection
    } else if (activeTab.value === 'users') {
      component = proxy.$refs.searchUser
    }
    
    console.log(component)
    if (component && component.searchByKeyword) {
      component.searchByKeyword(keyword)
    } else {
      console.error('searchByKeyword method not found on current tab component')
    }
  })
}

const setActiveTab = (tab) => {
  activeTab.value = tab
  nextTick(() => {
    searchByKeywordFromComponent(props.searchKeyword)
  })
}

const setSearchCount = (count) => {
  searchCount.value = count
}
const setSearchCount = (count) => {
  console.log('상위뷰 호츄ㅜㄹ')
  console.log(count)
  searchCount.value = count
}

defineExpose({
  searchByKeywordFromComponent
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
