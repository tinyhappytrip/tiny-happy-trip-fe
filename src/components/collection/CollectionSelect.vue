<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="story in stories" :key="story.storyId">
        <div class="card" :class="{ selected: isSelected(story) }" @click="toggleSelection(story)">
          <div class="card-img" :style="{ backgroundImage: `url(${imagePath(story.images[0])})` }"></div>
          <div class="card-content">
            <div class="card-title">{{ computedTitle(story.placeName) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineEmits, defineExpose, inject } from 'vue'
import { userStory } from '@/api/story-api'
import { useAuthStore } from '@/stores/auth'
import { imagePath } from '@/util/http-commons'

const emit = defineEmits(['sendSelectedStories'])
const authStore = useAuthStore()
const loginUserId = computed(() => authStore.userId)
const stories = ref([])
const selectedStories = ref([])

const getUserStory = () => {
  userStory(
    loginUserId.value,
    (result) => {
      stories.value = result.data
    },
    (error) => console.log(error)
  )
}

const searchByKeyword = (keyword) => {
  fetchStories(keyword)
}

const computedTitle = (title) => {
  if (title.length > 10) {
    return title.substring(0, 10) + '...'
  }
  return title
}

const toggleSelection = (story) => {
  const index = selectedStories.value.indexOf(story)
  if (index === -1) {
    if (selectedStories.value.length < 6) {
      selectedStories.value.push(story)
    } else {
      showToast()
    }
  } else {
    selectedStories.value.splice(index, 1)
  }
  emit('sendSelectedStories', selectedStories.value)
}

const isSelected = (story) => {
  return selectedStories.value.includes(story)
}

onMounted(() => {
  getUserStory()
})

defineExpose({
  searchByKeyword
})

const Swal = inject('$swal')

const showToast = () => {
  Swal.fire({
    text: '6개 이상 선택할 수 없습니다.',
    icon: 'error',
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      container: 'custom-swal'
    }
  })
}
</script>

<style scoped>
.container {
  max-width: 1100px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: calc(624px - 20px);
  padding: 0 20px;
  margin-top: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}

.col {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 12px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .col {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }
}

.card {
  cursor: pointer;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding-top: 100%;
}

.card:hover .card-img {
  filter: blur(5px);
}

.card-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: filter 0.3s ease;
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  flex-direction: column;
}

.card:hover .card-content {
  opacity: 1;
}

.card-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.card-title {
  color: black;
  font-weight: bold;
}

.card-info span {
  margin: 0 10px;
  color: black;
}

.selected {
  outline: 4px solid #007bff;
  border: 1px solid #007bff;
}

.check-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  right: 0;
}

.check-overlay img {
  width: 100%;
  height: 100%;
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
