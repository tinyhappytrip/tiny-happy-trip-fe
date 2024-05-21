<template>
  <div class="container">
    <div v-for="(image, index) in images" :key="index">
      <img :src="imagePath(image)" alt="Image" />
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

const computedImagePath = (img) => {
  return `http://localhost:8080/image?path=${img}`
}

onMounted(() => {
  console.log('props.items!!!!@@@')
  console.log(props.items)
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
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.container div {
  position: relative;
  overflow: hidden;
}

.container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.container div:hover img {
  transform: scale(1.2); /* 호버 시 이미지 확대 */
}
</style>
