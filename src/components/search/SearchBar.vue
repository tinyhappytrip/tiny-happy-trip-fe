<template>
  <div class="search-bar">
    <input type="text" placeholder="검색어를 입력하세요." v-model="searchQuery" ref="searchInput" @keyup.enter="search" />
    <div class="icon-box">
      <transition name="fade">
        <div class="delete-button" v-if="searchQuery" @click="clearSearch">삭제</div>
      </transition>
      <button @click="search"><font-awesome-icon class="icon" :icon="['fas', 'magnifying-glass']" /></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'
const emit = defineEmits(['clickSearchButton'])
const searchQuery = ref('')
const searchInput = ref(null)

const clearSearch = () => {
  searchQuery.value = ''
  searchInput.value.focus()
  search()
}

const search = () => {
  emit('clickSearchButton', searchQuery.value)
}
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 40%;
  border-bottom: 1px solid black;
  margin: 50px auto;
}

.search-bar input {
  flex: 1;
  padding: 10px 5px;
  border: none;
  outline: none;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s ease;
  font-size: 1.2rem;
  font-weight: 500;
}

.search-bar input:focus {
  border-color: black;
}

.icon-box {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
}

.icon-box .icon {
  width: 20px;
  height: 20px;
  margin-left: 30px;
  cursor: pointer;
}

.icon-box .delete-button {
  cursor: pointer;
}

/* 트랜지션 효과 추가 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
