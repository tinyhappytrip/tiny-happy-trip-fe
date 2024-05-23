<template>
  <div class="container">
    <div class="row">
      <div v-for="(story, index) in userStories" :key="index" class="col">
        <div class="card">
          <img :src="imagePath(story.images[0])" :alt="story.content" class="card-img" />
          <div class="card-title">{{ story.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { userStory } from '@/api/story-api'
import { imagePath } from '@/util/http-commons'
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
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row {
  width: 33%;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.col {
  width: 33%;
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
  height: 200px;
  width: 200px;
}

.card-img {
  width: 100%;
  height: 100%;
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
