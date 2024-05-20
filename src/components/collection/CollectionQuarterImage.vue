<template>
  <div class="container">
    <div v-for="(image, index) in images" :key="index">
      <img :src="computedImagePath(image)" alt="Image" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
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
  console.log(items.value)
  for (let i = 0; i < items.value.length; i++) {
    if (i == 4) break
    images.value.push(items.value[i].imagePath)
  }
})
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px; /* 사분할 영역 사이의 간격 조정 */
  width: 400px; /* 그리드 전체 너비 설정 */
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
