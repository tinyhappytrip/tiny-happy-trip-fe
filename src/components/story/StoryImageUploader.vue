<template>
  <v-carousel
    style="height: 100%; border-top: 1px solid #ddd"
    v-if="story.imageFiles && story.imageFiles.length"
    hide-delimiters
    v-model="currentIndex"
    :cycle="false"
    show-arrows="hover"
  >
    <template v-slot:next>
      <font-awesome-icon
        v-if="currentIndex !== story.imageFiles.length - 1"
        :icon="['fas', 'arrow-right']"
        class="custom-arrow next-arrow"
        @click.stop="goToNext"
      />
    </template>
    <template v-slot:prev>
      <font-awesome-icon v-if="currentIndex !== 0" :icon="['fas', 'arrow-right']" rotation="180" class="custom-arrow prev-arrow" @click.stop="goToPrev" />
    </template>
    <v-carousel-item v-for="(file, index) in story.imageFiles" :key="index">
      <div class="image-container">
        <img v-if="file" :src="getFileUrl(file)" class="carousel-image" />
      </div>
    </v-carousel-item>
  </v-carousel>
  <!-- 
  <div style="width: 100%; height: 100%" v-else>
    <img src="/src/assets/add_picture.png" class="align-end" width="100%" height="100%" @click="triggerFileInput" />
  </div>
-->
  <div class="button-box" v-else>
    <button @click="triggerFileInput">클릭해서 <br /><br />사진을 추가하세요.</button>
  </div>
  <input @change="handleFileChange" type="file" hidden ref="fileInput" multiple />
</template>

<script setup>
import { ref, defineModel, defineExpose } from 'vue'
import { VCarousel, VCarouselItem, VBtn } from 'vuetify/components'

const story = defineModel('story')
const currentIndex = ref(0)

if (!story.value.imageFiles) {
  story.value.imageFiles = []
}

const fileCountMessage = ref('No files selected')
const fileInput = ref(null)

const handleFileChange = (event) => {
  const newFiles = Array.from(event.target.files)
  story.value.imageFiles = [...(story.value.imageFiles || []), ...newFiles]
  fileCountMessage.value = `${story.value.imageFiles.length} file(s) selected`
  resetFileInput()
}

const deleteImage = (index) => {
  if (index >= 0 && index < story.value.imageFiles.length) {
    story.value.imageFiles.splice(index, 1)
    fileCountMessage.value = `${story.value.imageFiles.length} file(s) selected`
    if (currentIndex.value >= story.value.imageFiles.length) {
      currentIndex.value = story.value.imageFiles.length - 1
    }
  }
}

const getFileUrl = (file) => {
  return URL.createObjectURL(file)
}

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const resetFileInput = () => {
  fileInput.value.type = ''
  fileInput.value.type = 'file'
}

defineExpose({ deleteImage, currentIndex })

const goToPrev = () => {
  currentIndex.value = (currentIndex.value - 1 + story.value.imageFiles.length) % story.value.imageFiles.length
}

const goToNext = () => {
  currentIndex.value = (currentIndex.value + 1) % story.value.imageFiles.length
}
</script>

<style scoped>
#imagePreview {
  cursor: pointer;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-arrow {
  width: 16px;
  height: 16px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  position: absolute;
  top: 50%;
}

.v-carousel:hover .custom-arrow {
  opacity: 1;
}

.next-arrow {
  right: 20px;
}

.prev-arrow {
  left: 20px;
}

.button-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
