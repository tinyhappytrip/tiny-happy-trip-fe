<template>
  <div class="memory-grid">
    <SectionTwoCard
      v-for="(memory, index) in memories"
      :key="index"
      :image="memory.image"
      :title="memory.title"
      :description="memory.description"
      :link="memory.link"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SectionTwoCard from './SectionTwoCard.vue'

const memories = ref([
  {
    image: 'src/assets/main/poorin.png',
    title: '제주도'
  },
  {
    image: 'src/assets/main/poorin.png',
    title: '2024년'
  },
  {
    image: 'src/assets/main/poorin.png',
    title: '일본 여행기'
  }
  // Add more memories as needed
])
</script>

<style scoped>
.memory-grid {
  display: flex;
  margin-top: 100px;
}
</style>
