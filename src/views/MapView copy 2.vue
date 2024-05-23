<template>
  <Header />
  <div class="app-container">
    <div class="left-container">
      <div class="tabs">
        <button @click="changeTab('search')" :class="{ active: tab === 'search' }">검색 목록</button>
        <button @click="changeTab('saved')" :class="{ active: tab === 'saved' }">저장 목록</button>
      </div>
      <div v-if="tab === 'saved' && selectedList === null" class="tab-content">
        <h3 style="font-size: 1.2rem">전체 여정 목록: {{ lists.length }}</h3>
        <button @click="showModal = true">새 여정 목록 만들기</button>
        <ul class="list">
          <li v-for="list in lists" :key="list.id" @click="openList(list)" class="list-item">
            {{ list.title }}
          </li>
        </ul>
      </div>
      <div v-if="selectedList" class="tab-content">
        <button @click="selectedList = null">뒤로가기</button>
        <h3>{{ selectedList.title }}</h3>
        <ul class="list">
          <li v-for="item in selectedList.items" :key="item.id" class="list-item">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="right-container">
      <div id="map" class="map"></div>
      <div class="category-buttons"></div>
      <button class="search-button">현재 지도에서 검색</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>새 여정 목록 만들기</h3>
        <input v-model="newListTitle" placeholder="여정 제목 입력" />
        <button @click="createList">만들기</button>
        <button @click="showModal = false">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const tab = ref('saved')
const showModal = ref(false)
const newListTitle = ref('')
const lists = reactive([])
const selectedList = ref(null)

const changeTab = (selectedTab) => {
  tab.value = selectedTab
}

const fetchLists = async () => {
  // Mock server fetch
  lists.push({
    id: 1,
    title: '여정 1',
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]
  })
  lists.push({
    id: 2,
    title: '여정 2',
    items: [
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' }
    ]
  })
}

const createList = () => {
  if (newListTitle.value) {
    lists.push({ id: Date.now(), title: newListTitle.value, items: [] })
    newListTitle.value = ''
    showModal.value = false
  }
}

const openList = (list) => {
  selectedList.value = list
}

onMounted(() => {
  fetchLists()
})
</script>

<style scoped>
.app-container {
  display: flex;
  width: 70%;
  margin: 0 auto;
  margin-top: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  border-radius: 10px;
  height: 800px;
}

.left-container {
  width: 30%;
  box-sizing: border-box;
  border-radius: 10px 0 0 10px;
}

.right-container {
  width: 70%;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 0 10px 10px 0;
}

.tabs {
  display: flex;
  justify-content: space-between;
}

.tabs button {
  flex: 1;
  padding: 15px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px 5px 0 0;
  transition: background-color 0.3s ease;
}

.tabs button.active {
  background-color: #ffffff;
  font-weight: bold;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.tab-content {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  position: relative;
}

.tab-content .list {
  list-style: none;
  height: 588px;
  overflow-y: auto;
}

.category-buttons {
  z-index: 1000;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}

.category-buttons button {
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-buttons button:hover {
  background-color: #e0e0e0;
}

.search-button {
  z-index: 1000;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #1c86ee;
}

.tab-content input,
.tab-content select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.list-item {
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

.list-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.list-item img.list-item-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

.list-item a {
  color: #1e90ff;
  text-decoration: none;
}

.list-item a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 10px 0;
}

.no-results {
  text-align: center;
  padding: 10px 0;
  color: #888;
  position: absolute;
  bottom: 0;
  width: 90%;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}
</style>
