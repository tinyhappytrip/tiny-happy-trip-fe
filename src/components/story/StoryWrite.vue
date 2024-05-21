<template>
  <div>
    <v-card class="card">
      <span class="title">
        <h1>이야기 작성</h1>
      </span>

      <div class="content">
        <div class="left-content">
          <StoryImageUploader v-model:story="story"></StoryImageUploader>
        </div>

        <div class="right-content">
          <StoryForm :story="story"></StoryForm>
        </div>
      </div>
      <v-btn class="write-button" @click="uploadStory"> 스토리 작성 </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { writeStory } from '@/api/story-api'
import { ref, onMounted, watch, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import StoryImageUploader from '@/components/story/StoryImageUploader.vue'
import StoryForm from './StoryForm.vue'

const story = ref({})
const searchMode = ref(false)
const router = useRouter()

const uploadStory = () => {
  story.value.latitude = 123.123
  story.value.longitude = 123.123
  writeStory(
    toRaw(story.value),
    (result) => {
      console.log(result.data)
      // router.push('/story')
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
  padding: 10px;
  border: 1px solid black;
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

.write-button {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  margin-right: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

.write-button:hover {
  background-color: #ff6659;
}
.card > * {
  padding: 10px;
}
</style>
