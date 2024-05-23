<template>
  <div class="memory-card">
    <img :src="imagePath(image)" alt="Memory Image" />
    <div class="card-info">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { imagePath } from '@/util/http-commons'

const props = defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.memory-card {
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  width: 250px;
  margin: 20px;
  cursor: pointer;
  background: white;
}

.memory-card img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

.card-info {
  background-color: white;
  padding: 10px;
}

.card-info h2 {
  font-size: 1.2em;
  margin: 10px 0;
  color: black;
}

.card-info p {
  font-size: 0.9em;
  color: #555;
}
</style>
