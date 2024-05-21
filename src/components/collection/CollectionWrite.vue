<template>
  <div>
    <v-card class="card">
      <div class="card-top">
        <div class="card-top-left">
          <span class="title">
            <h1>모음집 작성</h1>
          </span>
          <div>
            <label>제목</label>
            <input v-model="collection.title" />
          </div>
          <div>
            <label>설명</label>
            <input v-model="collection.description" />
          </div>
          <div>
            <label>MUSIC</label>
            <input v-model="collection.musicKeyword" placeholder="모음집과 어울리는 음악 키워드를 입력해주세요" />
          </div>

          <div class="toggle">
            <div>공개 범위</div>
            <div class="radio-group">
              <label class="radio-option"> <input v-model="collection.scope" type="radio" name="visibility" value="PUBLIC" /> 공개 </label>
              <label class="radio-option"> <input v-model="collection.scope" type="radio" name="visibility" value="PRIVATE" /> 비공개 </label>
              <label class="radio-option"> <input v-model="collection.scope" type="radio" name="visibility" value="FOLLOWER" /> 팔로워만 공개 </label>
            </div>
          </div>
        </div>

        <div class="card-top-right">
          <div class="header">
            <div>스토리 사진들</div>
            <span><button @click="write" class="write-button">모음집 생성</button></span>
          </div>
          <div class="story-cards">
            <div v-for="story in selectedStories" :key="story.storyId" class="story-card">
              <div class="card-img" :style="{ backgroundImage: `url(${computedImagePath(story.images[0])})` }"></div>
              <img :src="`http://localhost:8080/image?path=${computedImagePath(story.images[0])}`" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <CollectionSelect @send-selected-stories="updateSelectedStories" />
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { writeCollection } from '@/api/collection-api'
import CollectionSelect from '@/components/collection/CollectionSelect.vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['sendSelectedStories'])
const router = useRouter()
const authStore = useAuthStore()

const collection = ref({
  title: '',
  description: '',
  scope: '',
  collectionItems: [],
  musicKeyword: ''
})

const selectedStories = ref([])

const updateSelectedStories = (stories) => {
  selectedStories.value = stories
  collection.value.collectionItems = []
  for (let i = 0; i < stories.length; i++) {
    collection.value.collectionItems.push(stories[i].storyId)
  }
}

const computedImagePath = (img) => {
  console.log(img)
  return `http://localhost:8080/image?path=${img}`
}

const write = () => {
  writeCollection(
    collection.value,
    (result) => {
      console.log(result.data)
      router.push('/')
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>

<style scoped>
.card {
  width: 1000px;
  height: 700px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid black;
  overflow-y: auto;
  margin-top: 100px;
}

.card-top {
  display: flex;
  justify-content: space-between;
}

.card-top-left {
  flex: 1;
  margin-right: 20px;
}

.card-top-right {
  flex: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.story-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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

.story-card {
  cursor: pointer;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 100px;
  height: 100px;
}

input {
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  width: 500px;
}

.radio-group {
  display: flex;
  flex-direction: column;
}

.radio-option {
  margin-bottom: 10px;
}

.write-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
