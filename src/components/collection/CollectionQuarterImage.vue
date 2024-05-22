<template>
  <div class="image-box">
    <div v-for="(image, index) in images" :key="index">
      <img :src="imagePath(image[0])" alt="Image" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
import { imagePath } from '@/util/http-commons'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
const items = ref(props.items)
const images = ref([])

onMounted(() => {
  for (let i = 0; i < props.items.length; i++) {
    if (i == 4) break
    images.value.push(props.items[i].imagePath)
  }
})

watch(
  () => props.items,
  (newItems) => {
    if (newItems) {
      items.value = newItems
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.image-box {
  width: 380px;
  height: 380px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.image-box div {
  position: relative;
  overflow: hidden;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
</style>
