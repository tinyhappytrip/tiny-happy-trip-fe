<script setup>
import { writeStory } from '@/api/story'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import StoryImageUploader from '@/components/story/StoryImageUploader.vue'
import StoryForm from './StoryForm.vue'

const story = ref({})
const searchMode = ref(false)
const route = useRoute()

const uploadStory = () => {
  const { content, weather, emotion, location, scope, latitude, longitude, hashtags, tags, imageFiles } = story.value // 객체 분해
  const storyData = { content, weather, emotion, location, scope, latitude, longitude, hashtags, tags, imageFiles }
  storyData.latitude = 2.2
  storyData.longitude = 2.2
  writeStory(
    storyData,
    (result) => {
      console.log(result.data)
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>

<template>
  <div>
    <v-card class="card">
      <span class="title">
        <h3>이야기 작성</h3>
      </span>

      <div class="content">
        <div class="left-content">
          <StoryImageUploader :story="story"></StoryImageUploader>
        </div>

        <div class="right-content">
          <StoryForm :story="story"></StoryForm>
        </div>
      </div>
      <div>
        <v-btn justify="end" color="#0C081E" size="small" style="float: right" @click="uploadStory"> 스토리 작성 </v-btn>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.card {
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  padding: 10px;
}

.title > * {
  text-align: center;
}
.content {
  display: flex;
  margin: 0 auto;
  justify-content: center;
}
.buttons {
  margin-top: 10px;
  padding-right: 10px;
}
.left-content {
  flex: 1;
  padding-right: 10px;
  width: 500px;
  border-right: 1px solid black;
}

.right-content {
  flex: 2;
  width: 500px;
}

.right-content > * {
  margin: 10px;
}

.card > * {
  border: 1px solid red;
  padding: 10px;
}
</style>
