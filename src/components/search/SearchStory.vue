<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="(item, index) in items" :key="index">
        <div class="card" @click="showDetail(item.storyId)">
          <div class="card-img" :style="{ backgroundImage: `url(${imagePath(item.image)})` }"></div>
          <div class="card-content">
            <div class="card-title">{{ computedTitle(item.title) }}</div>
            <div class="card-info">
              <span>👍 {{ item.likes }}</span>
              <span>💬 {{ item.comments }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { listStoryBySearchKeyword } from '@/api/story-api'
import { imagePath } from '@/util/http-commons'
const props = defineProps({
  searchKeyword: {
    type: String
  }
})
const searchKeyword = ref(props.searchKeyword)
const emit = defineEmits(['setSearchCount'])
const items = ref([])
const searchByKeyword = (keyword) => {
  fetchStories(keyword)
}
const fetchStories = (keyword) => {
  items.value = []
  listStoryBySearchKeyword(
    keyword,
    (result) => {
      items.value = []
      for (let i = 0; i < result.data.length; i++) {
        const story = result.data[i]
        let replyCount = 0
        for (let j = 0; j < story.storyComments.length; j++) {
          replyCount += story.storyComments[j].storyReplies.length
        }
        items.value.push({
          storyId: story.storyId,
          title: story.content,
          image: story.images[0],
          likes: story.likeCount,
          comments: story.storyComments.length + replyCount
        })
      }
      console.log('usercount', items.value.length)
      emit('setSearchCount', items.value.length)
    },
    (error) => console.log(error)
  )
}

const computedTitle = (title) => {
  if (title.length > 15) {
    return title.substring(0, 15) + '...더보기'
  }
  return title
}

onMounted(() => {
  fetchStories(searchKeyword.value)
})

defineExpose({
  searchByKeyword
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
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
  flex-direction: column; /* 추가 */
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
}
.card-info span {
  margin: 0 10px;
  color: black;
}
</style>
