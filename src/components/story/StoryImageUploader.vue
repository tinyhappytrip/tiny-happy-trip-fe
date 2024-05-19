<template>
  <div>
    <v-img src="/src/assets/add_picture.png" class="align-end" width="500px" height="500px" cover id="imagePreview"> </v-img>
    <p id="file-count">No files Selected</p>
    <input v-on="story.imageFiles" @change="handleFileChange" type="file" hidden id="file-input" multiple />
  </div>
</template>

<script setup>
import { ref, onMounted, defineModel, defineProps, proxyRefs } from 'vue'

const fileCountMessage = ref('No files selected')
const story = defineModel('story')

const handleFileChange = (event) => {
  const fileCount = event.target.files.length
  story.value.imageFiles = event.target.files
  fileCountMessage.value = `${fileCount} file(s) selected`
}

onMounted(() => {
  document.getElementById('imagePreview').addEventListener('click', () => {
    document.getElementById('file-input').click()
  })
  console.log(story.value)
})
</script>

<style scoped>
#imagePreview {
  cursor: pointer;
}
</style>
