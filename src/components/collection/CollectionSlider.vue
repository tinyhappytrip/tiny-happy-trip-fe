<template>
  <div class="story-slider">
    <div class="story-container">
      <div
        v-for="(story, index) in stories"
        :key="index"
        :class="['story', { active: index === activeIndex, prev: index < activeIndex, next: index > activeIndex }]"
      >
        <img :src="story" alt="story image" />
      </div>
    </div>
    <button @click="prevStory" class="nav-button prev">Previous</button>
    <button @click="nextStory" class="nav-button next">Next</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stories = ref([
  './src/assets/main/poorin.png',
  './src/assets/main/poorin.png',
  './src/assets/main/poorin.png',
  './src/assets/main/poorin.png',
  './src/assets/main/poorin.png'
])

const activeIndex = ref(0)

const nextStory = () => {
  activeIndex.value = (activeIndex.value + 1) % stories.value.length
}

const prevStory = () => {
  activeIndex.value = (activeIndex.value - 1 + stories.value.length) % stories.value.length
}
</script>

<style scoped>
.story-slider {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 500px;
  margin: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.story-container {
  display: flex;
  transition: transform 0.5s ease;
  width: calc(100% * 5);
  justify-content: center;
}

.story {
  flex: 1 0 20%;
  opacity: 0.5;
  transform: scale(0.8);
  transition: opacity 0.5s, transform 0.5s;
}

.story img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story.active {
  flex: 1 0 20%;
  opacity: 1;
  transform: scale(1);
}

.story.prev,
.story.next {
  opacity: 0.75;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
</style>
