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
            <Swiper :slides-per-view="1" v-if="images.length" @slideChange="onSlideChange" :initial-slide="imageIndex" @swiper="onSwiperInit">
              <SwiperSlide style="height: 500px; width: 500px" v-for="(image, index) in images" :key="index">
                <div class="slider-box"><img :src="imagePath(image)" class="image" /></div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div class="story-list">
          <div class="info-box">
            <RouterLink :to="`/profile/${collectionData.userId}`">
              <div class="image-box">
                <img width="30px" height="30px" :src="imagePath(collectionData.profileImagePath)" />
              </div>
            </RouterLink>
            <div class="user-box">
              <span class="title">{{ collectionData.nickname }}</span>
              <span class="sub">
                {{ collectionData.title }}
              </span>
            </div>
          </div>
          <ul>
            <li
              v-for="(collectionItem, itemIndex) in collectionData.collectionItems"
              :key="itemIndex"
              :class="{ active: imageToItemMap[imageIndex] === itemIndex }"
              @click="setImageIndex(images.indexOf(collectionItem.imagePath[0]))"
            >
              <div class="story-info">
                <span class="story-number">{{ itemIndex + 1 }}</span>
                <span class="story-title">{{ collectionItem.placeName }}</span>
                <span class="story-duration">{{ computedDate(collectionItem.createdAt) }}</span>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <div class="control-buttons">
        <button class="control-button" @click="prevSlide">⏮️</button>
        <button class="control-button" @click="playPause">{{ isPlaying ? '⏸️' : '▶️' }}</button>
        <button class="control-button" @click="nextSlide">⏭️</button>
      </div>
    </div>
  </div>
  <div v-if="videoId">
    <iframe
      :width="0"
      :height="0"
      :src="videoUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ref="youtubeaPlayer"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { defineProps } from 'vue'
import { imagePath } from '@/util/http-commons'
import axios from 'axios'

const props = defineProps({
  collectionData: {
    required: true,
    type: Object
  }
})

const images = ref([])
const imageIndex = ref(0)
let swiperInstance = null
let autoPlayInterval = null
const isPlaying = ref(false)

const computedDate = (rawDate) => {
  const date = new Date(rawDate)
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}

// Map to keep track of which image belongs to which collectionItem
const imageToItemMap = ref([])

watch(
  () => props.collectionData,
  () => {
    images.value = []
    imageToItemMap.value = []
    props.collectionData.collectionItems.forEach((item, itemIndex) => {
      item.imagePath.forEach((imagePath) => {
        images.value.push(imagePath)
        imageToItemMap.value.push(itemIndex)
      })
    })
  },
  { immediate: true }
)

const onSlideChange = (swiper) => {
  imageIndex.value = swiper.activeIndex
}

const prevSlide = () => {
  if (swiperInstance) {
    swiperInstance.slidePrev()
  }
}

const nextSlide = () => {
  if (swiperInstance) {
    swiperInstance.slideNext()
  }
}

const playPause = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    autoPlayInterval = setInterval(() => {
      nextSlide()
    }, 3000)
  } else {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const setImageIndex = (index) => {
  imageIndex.value = index
  if (swiperInstance) {
    swiperInstance.slideTo(index)
  }
}

const onSwiperInit = (swiper) => {
  swiperInstance = swiper
}

const searchQuery = ref('')
const videoId = ref('')
const youtubePlayer = ref(null)

const searchVideos = async () => {
  try {
    const response = await axios.get(`http://192.168.120.75:8080/youtube?keyword=${props.collectionData.musicKeyword}` + '에 어울리는 노래')
    console.log(response)
    const videoInfo = response.data
    if (videoInfo.includes('URL:')) {
      const urlIndex = videoInfo.indexOf('URL:') + 5
      const videoUrl = videoInfo.substring(urlIndex)
      const videoIdIndex = videoUrl.indexOf('=') + 1
      videoId.value = videoUrl.substring(videoIdIndex)

      if (youtubePlayer.value) {
        youtubePlayer.value.contentWindow.postMessage('{"event":"command","func":"' + 'setVolume' + '","args":[' + 10 + ']}', '*')
      }
    } else {
      videoId.value = ''
    }
  } catch (error) {
    console.error('Error while searching videos:', error)
  }
}

const videoUrl = computed(() => {
  if (videoId.value) {
    return `https://www.youtube.com/embed/${videoId.value}?autoplay=1`
  } else {
    return ''
  }
})

// searchVideos 함수를 컴포넌트가 렌더링될 때 호출
onMounted(() => {
  searchVideos()
  playPause() // Start the slideshow automatically
})
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
  width: 95%;
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
.control-button img {
  width: 30px;
  height: 30px;
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
  justify-content: space-between;
  align-items: flex-start;
  width: 95%;
  gap: 20px;
}

.collection-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
}

.collection-image .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.collection-image img {
  width: 100%;
  height: 100%;
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

.story-list .info-box {
  cursor: default;
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}

.story-list .info-box .image-box {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.story-list .info-box .image-box img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
  cursor: default;
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
  width: 100%;
  height: 100%;
  object-fit: contain;
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

.slider-box {
  width: 100%;
  height: 100%;
}

.story-list .user-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  width: 100%;
}

.story-list .user-box .title {
  width: 100%;
  color: black;
  font-weight: bold;
  display: block;
  position: relative;
}

.story-list .user-box .sub {
  width: 100%;
  color: grey;
  font-weight: bold;
  display: block;
  position: relative;
  font-size: 0.9rem;
}
</style>
