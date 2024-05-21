<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="story in stories" :key="story.storyId">
        <div class="card" :class="{ selected: selectedStories.includes(story) }" @click="toggleSelection(story)">
          <div class="card-img" :style="{ backgroundImage: `url(${computedImagePath(story.images[0])})` }"></div>
          <div class="card-content">
            <div class="card-title">{{ computedTitle(story.content) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineEmits } from 'vue'
import { userStory } from '@/api/story-api'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['sendSelectedStories'])
const authStore = useAuthStore()
const loginUserId = computed(() => authStore.userId)
const stories = ref([])
const selectedStories = ref([])

const getUserStory = () => {
  userStory(
    loginUserId.value,
    (result) => {
      console.log(result.data)
      stories.value = result.data
    },
    (error) => console.log(error)
  )
}

const searchByKeyword = (keyword) => {
  fetchStories(keyword)
}

const computedTitle = (title) => {
  if (title.length > 15) {
    return title.substring(0, 15) + '...더보기'
  }
  return title
}

const computedImagePath = (img) => {
  return `http://localhost:8080/image?path=${img}`
}

const toggleSelection = (story) => {
  const index = selectedStories.value.indexOf(story)
  if (index === -1) {
    selectedStories.value.push(story)
  } else {
    selectedStories.value.splice(index, 1)
  }
  emit('sendSelectedStories', selectedStories.value)
}

onMounted(() => {
  getUserStory()
})

defineExpose({
  searchByKeyword
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.col {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 8px;
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

.card:hover .card-img {
  filter: blur(5px);
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

.card-title {
  color: black;
}

.selected {
  border: 2px solid #007bff; /* 선택된 카드의 테두리 색상 */
}
</style>
