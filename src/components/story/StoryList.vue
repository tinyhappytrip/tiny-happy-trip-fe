<template>
  <div class="story-container">
    <div class="story-list">
      <StoryCard v-for="story in stories" :key="story.storyId" :story="story" @move-detail="handleMoveDetail(story.storyId)" />
    </div>
  </div>
  <div v-if="showModal" class="modal-overlay">
    <StoryDetail :story="story" :storyId="storyId" @close="closeModal" />
  </div>
</template>

<script setup>
import { listStory, detailStory } from '@/api/story-api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StoryCard from '@/components/story/StoryCard.vue'
import StoryDetail from './StoryDetail.vue'
import StoryAccordionTab from '@/components/story/StoryAccordionTab.vue'

const stories = ref([])
const showModal = ref(false)
const story = ref({})
const storyId = ref(0)

const getStoryList = () => {
  listStory(
    (result) => {
      stories.value = result.data
    },
    (error) => {
      console.log(error)
    }
  )
}

const handleMoveDetail = async (detailStoryId) => {
  storyId.value = detailStoryId
  await getStoryDetail(detailStoryId)
  showModal.value = true
  disableScroll()
}

const closeModal = () => {
  showModal.value = false
  enableScroll()
  getStoryList()
}

const getStoryDetail = async (storyId) => {
  await detailStory(
    storyId,
    (result) => {
      story.value = result.data
    },
    (error) => {
      console.log(error)
    }
  )
}

const disableScroll = () => {
  document.documentElement.style.overflow = 'hidden'
}

const enableScroll = () => {
  document.documentElement.style.overflow = ''
}

onMounted(() => {
  getStoryList()
})
</script>

<style scoped>
.story-container {
  display: flex;
  margin-top: 100px;
  margin: 150px auto 0 auto;
  justify-content: center;
}

.tabs {
  border: 1px solid black;
  width: 200px;
  height: 300px;
  margin-left: auto;
  position: fixed;
  right: 400px;
}
</style>
