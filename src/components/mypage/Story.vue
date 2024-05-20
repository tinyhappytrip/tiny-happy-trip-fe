<template>
  <div class="container">
    <div class="row">
      <div v-for="(story, index) in userStories" :key="index" class="col">
        <div class="card">
          <img :src="computedImagePath(story.images[0])" :alt="story.content" class="card-img" />
          <div class="card-title">{{ story.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStory } from '@/api/story'
const userStories = ref([])
const { userId } = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

userStory(
  userId,
  (result) => {
    console.log(result)
    userStories.value = result.data
  },
  (error) => {
    console.log(error)
  }
)
const computedImagePath = (img) => {
  return `http://localhost:8080/image?path=${img}`
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.col {
  flex: 1 0 30%;
  box-sizing: border-box;
  padding: 10px;
}

.card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  background: #fff;
  transition: all 0.3s ease-in-out;
}

.card-img {
  width: 100%;
  height: auto;
  filter: blur(3px);
  transition: filter 0.3s ease-in-out;
}

.card-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 1.2rem;
  font-weight: 400;
  transition: opacity 0.2s ease-in-out;
}

.card:hover .card-img {
  filter: blur(0);
}

.card:hover .card-title {
  opacity: 0;
}
</style>
