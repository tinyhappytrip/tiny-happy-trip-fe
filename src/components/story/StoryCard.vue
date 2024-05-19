<template>
  <div class="clip-icon">
    <img src="@/assets/clip.png" />
  </div>
  <div class="card" @click.stop="moveDetail(story.storyId)">
    <div class="subcard">
      <span class="title1">
        <img :src="story.userImage ? story.userImage : '/src/assets/main/user.png'" class="user-image" />
        <span>{{ story.nickname }}</span>
        <span style="color: #808080"> {{ computedDate(story.createdAt) }}</span>
        <span>날씨</span><img width="30px" :src="computedWeather" /> <span>감정</span><img width="30px" :src="computedEmotion" />
        <button @click.stop="openMenu = !openMenu" class="menu_btn">
          <img src="@/assets/main/menu.png" width="35px" class="menu" />
        </button>
        <v-list v-if="openMenu">
          <v-list-item @click.stop="onEdit">
            <v-list-item-title><button>수정하기</button></v-list-item-title>
          </v-list-item>
          <v-list-item @click.stop="onDelete">
            <v-list-item-title><button>삭제하기</button></v-list-item-title>
          </v-list-item>
        </v-list>
      </span>
    </div>
    <span class="loc">
      <img src="@/assets/main/location.png" width="20px" />
      <span>{{ story.location }}</span>
    </span>
    <StoryImageCarousel :images="story.images" @click.stop="moveDetail(story.storyId)"></StoryImageCarousel>

    <StoryLike :story="story" style="margin: 0 30px"></StoryLike>

    <div style="padding: 10px 0 30px 40px">
      {{ story.content }}
    </div>

    <span style="padding: 10px; color: blue" v-for="(hashtag, idx) in story.tags" :key="idx">
      {{ hashtag }}
    </span>
    <StoryCommentInput 
    :storyId="story.storyId" 
    v-model:commentMode="commentMode">
  </StoryCommentInput>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, computed, onMounted, ref } from 'vue'
import StoryLike from '@/components/story/StoryLike.vue'
import StoryImageCarousel from '@/components/story/StoryImageCarousel.vue'
const { story } = defineProps({
  story: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['move-detail'])
const openMenu = ref(false)
const commentMode = ref(true)

const computedDate = (rawDate) => {
  const date = rawDate.split(' ')[0]
  const yearMonthDay = date.split('-')
  const year = yearMonthDay[0].slice(-2)
  const month = yearMonthDay[1]
  const day = yearMonthDay[2]
  return year + '년 ' + month + '월 ' + day + '일'
}
const computedWeather = computed(() => {
  return '/src/assets/weather/' + story.weather + '.png'
})

const computedEmotion = computed(() => {
  return '/src/assets/emotion/' + story.emotion + '.png'
})

const moveDetail = (storyId) => {
  console.log(storyId)
  emit('move-detail', storyId)
}
</script>

<style scoped>
.title1 {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  margin: 20px 30px 0 30px;
  display: flex;
}

.title1 > * {
  padding: 0 5px;
}
.loc {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  margin-left: 30px;
}
.loc > * {
  padding-right: 5px;
  margin: 0 5px;
  font-size: 15px;
}

.user-image {
  border-radius: 50%;
  text-align: center;
  width: 30px;
}
.card {
  padding: 5px 20px;
  background: none;
  box-shadow: 0 0 0 transparent; /* 또는 'initial'로 설정 */
  background: white;
  border-radius: 5px;
  margin-bottom: 40px;
  width: 600px;
  border: 1px solid black;
}

.card > * {
  padding: 10px 0;
}

.subcard {
  position: relative;
}

.menu_btn {
  display: contents;
}
.menu {
  position: absolute;
  right: 0;
  margin: 0 25px;
}

.align-end {
  margin: 0 auto;
}

.clip-icon {
  position: absolute;
  z-index: 1000;
  margin: -30px;
}

.clip-icon img {
  width: 80px;
  height: auto;
}
</style>
