<template>
  <transition name="fade">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('update:visible', false)">
      <div class="modal">
        <button class="close-button" @click="clickCloseButton">닫기</button>
        <SearchBar @click-search-button="searchByKeyword" />
        <SearchContent ref="searchContent" :search-keyword="searchKeyword" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, getCurrentInstance, watch } from 'vue'
import SearchBar from '../search/SearchBar.vue'
import SearchContent from '../search/SearchContent.vue'
const searchKeyword = ref()

const props = defineProps({
  visible: {
    default: false
  }
})

const emit = defineEmits(['update:visible'])

const handleEsc = (event) => {
  if (event.key === 'Escape') {
    emit('update:visible', false)
  }
}

const clickCloseButton = () => {
  emit('update:visible', false)
  searchByKeyword.value = ''
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
})

const { proxy } = getCurrentInstance()

const searchByKeyword = (keyword) => {
  searchKeyword.value = keyword
  proxy.$refs.searchContent.searchByKeywordFromComponent(keyword)
}
watch(
  () => props.visible,
  (newValue) => {
    document.documentElement.style.overflow = newValue ? 'hidden' : 'auto'
  }
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2400;
  max-width: 100%;
  max-height: 100%;
  border-radius: 0;
}

.modal {
  background: white;
  width: 100%;
  height: 100vh;
  position: relative;
}

.close-button {
  position: absolute;
  top: 50px;
  right: 50px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
