<template>
  <div class="music-container">
    <div class="music-player">
      <header class="header">
        <div class="music-icon">🎵</div>
        <div class="song-name">
          {{ collectionData.musicKeyword }}
        </div>
      </header>
      <main class="main-content">
        <div class="collection-image">
          <div class="container">
            <!-- <template v-for="(collectionItem, index) in collectionData.collectionItems" :key="index">
              <img :src="imagePath(collectionItem.imagePath[0])" alt="Image" />
            </template> -->
          </div>
        </div>
        <div class="story-list">
          <h2>{{ collectionData.title }}</h2>
          <ul>
            <li v-for="(story, index) in collectionData.collectionItems" :key="index" :class="{ active: index === imageIndex }">
              <div class="story-info">
                <span class="story-number">{{ index + 1 }}</span>
                <span class="story-title">{{ story.location }}</span>
                <span class="story-duration">{{ computedDate(story.createdAt) }}</span>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <div class="control-buttons">
        <button class="control-button">⏮️</button>
        <button lass="control-button">▶️</button>
        <button class="control-button">⏭️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { imagePath } from '@/util/http-commons'

const props = defineProps({
  collectionData: {
    required: true
  }
})

const collection = ref({})
const images = ref([])
const imageIndex = ref(0)

const computedDate = (rawDate) => {
  const date = new Date(rawDate)
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}
</script>

<style scoped>
.music-container {
  display: flex;
  justify-content: center;
}
.music-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 100px;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 1000px;
  position: fixed;
  z-index: 999;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.control-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.control-buttons > * {
  font-size: 30px;
  margin: 5px;
}

.music-icon {
  font-size: 24px;
  margin-right: 10px;
}

.song-name {
  font-size: 18px;
  font-weight: bold;
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
}

.collection-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.collection-image img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.story-list {
  width: 400px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.story-list h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 10px;
  border-radius: 10px;
}

.story-list ul {
  list-style: none;
  padding: 0;
}

.story-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  padding: 10px;
}

.story-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.story-number {
  margin-right: 10px;
  font-weight: bold;
  color: #999;
}

.story-title {
  flex-grow: 1;
  color: #555;
}

.story-duration {
  margin-left: 10px;
  color: #999;
}

.image {
  width: 300px;
  height: 300px;
}

.container {
  width: 500px;
  height: 500px;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.container div:hover img {
  transform: scale(1.2); /* 호버 시 이미지 확대 */
}

.story-list li.active {
  background-color: #000;
  color: #fff;
  border-radius: 10px;
}

.play-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 24px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}
</style>
