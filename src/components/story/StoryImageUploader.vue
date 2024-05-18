<template>
  <div>
    <v-img src="/src/assets/add_picture.png" class="align-end" width="500px" height="500px" cover id="imagePreview"> </v-img>
    <p id="file-count">No files Selected</p>
    <input v-on="props.story.imageFiles" @change="handleFileChange" type="file" hidden id="file-input" multiple />
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, proxyRefs } from 'vue'

const fileCountMessage = ref('No files selected')
const { story } = defineProps({
  story: Object
})
const handleFileChange = (event) => {
  const fileCount = event.target.files.length
  props.story.imageFiles = event.target.files
  fileCountMessage.value = `${fileCount} file(s) selected`
}

onMounted(() => {
  document.getElementById('imagePreview').addEventListener('click', () => {
    document.getElementById('file-input').click()
  })
})
</script>

<style scoped>
#imagePreview {
  cursor: pointer;
}
</style>
