<template>
  <div class="clip-icon">
    <img src="@/assets/clip.png" />
  </div>
  <div class="card">
    <div class="subcard">
      <div class="title">
        <img :src="`http://localhost:8080/image?path=${story.userImage}`" class="user-image" />
        <div class="user-info-box">
          <div>{{ story.nickname }}</div>
          <div style="color: #808080">{{ formattedDate }}</div>
        </div>
        <div class="image-box">
          <img width="30px" :src="computedWeather" />
        </div>
        <div class="image-box">
          <img width="30px" :src="computedEmotion" />
        </div>
      </div>
    </div>
    <div class="location-box">
      <img src="@/assets/main/location.png" width="20px" />
      <span>{{ story.placeName }}</span>
    </div>
    <StoryImageCarousel style="height: 456px" :images="story.images" isList="true" @click.stop="moveDetail(story.storyId)" />
    <StoryLike :story="story"></StoryLike>
    <div style="display: inline; line-height: 1.5; font-size: 0.9rem" v-html="displayedContent"></div>
    <div style="display: inline; margin-left: 10px" v-if="hasLineBreaks && !showMore">
      <button @click="showMore = true">더보기 ..</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import StoryLike from '@/components/story/StoryLike.vue'
import StoryImageCarousel from '@/components/story/StoryImageCarousel.vue'
import StoryCommentInput from './StoryCommentInput.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.checkAuth()
const userId = computed(() => authStore.userId)

const { story } = defineProps({
  story: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['move-detail'])
const openMenu = ref(false)
const commentMode = ref(true)
const showMore = ref(false)

const formatDate = (rawDate) => {
  const date = new Date(rawDate)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}

const formattedDate = computed(() => formatDate(story.createdAt))

const computedWeather = computed(() => {
  return `/src/assets/weather/${story.weather}.png`
})

const computedEmotion = computed(() => {
  return `/src/assets/emotion/${story.emotion}.png`
})

const moveDetail = (storyId) => {
  emit('move-detail', storyId)
}

// 개행 문자를 <br> 태그로 변환하는 함수
const formatContent = (content) => {
  return content.replace(/\n/g, '<br>')
}

// 개행 문자가 있는지 확인하는 함수
const hasLineBreaks = computed(() => story.content.includes('\n'))

// 첫 줄만 추출하는 함수
const firstLine = computed(() => story.content.split('\n')[0])

// formattedContent 계산 속성 추가
const formattedContent = computed(() => formatHashtags(story.content))

// 표시할 컨텐츠 계산 속성
const displayedContent = computed(() => {
  if (showMore.value) {
    return formattedContent.value
  }
  return formatHashtags(firstLine.value)
})

const formatHashtags = (text) => {
  return text.replace(/\r\n|\n/g, '<br>').replace(/#(\S+)/g, '<span style="color: #003285; font-weight:bold">#$1</span>')
}
</script>

<style scoped>
.clip-icon {
  position: absolute;
  z-index: 10;
  margin: -20px;
}

.clip-icon img {
  width: 60px;
  height: auto;
}

.card {
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 100px;
  width: 500px;
  border: 2px solid #ddd;
}

.subcard {
  position: relative;
}

.title {
  display: flex;
  align-items: center;
  padding: 0 0 10px 0;
  font-size: 0.9rem;
}

.user-image {
  border-radius: 50%;
  text-align: center;
  width: 40px;
  height: 40px;
  justify-content: space-evenly;
  cursor: pointer;
}

.user-info-box div {
  margin: 2px 10px;
}

.image-box {
  margin: 0 10px;
}

.menu_btn {
  display: block;
  margin-left: auto;
  cursor: pointer;
}

.dropdown-menu {
  top: 40px;
  right: -15px;
  position: absolute;
  width: 60px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #ddd;
  z-index: 1000;
}

.dropdown-menu div {
  margin: 4px 0;
}

.dropdown-menu div:hover {
  color: white;
  background-color: black;
}

.location-box {
  display: flex;
  align-items: center;
  cursor: default;
  font-size: 0.9rem;
  margin: 5px 0;
}

.align-end {
  margin: 0 auto;
}
</style>
