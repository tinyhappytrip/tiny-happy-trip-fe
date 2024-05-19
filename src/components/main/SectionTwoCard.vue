<template>
  <div class="memory-card">
    <img :src="image" alt="Memory Image" />
    <div class="card-info">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  image: String,
  title: String
})
</script>

<style scoped>
.memory-card {
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  width: 250px;
  margin: 0 45px;
  cursor: pointer;
}

.memory-card img {
  width: 250px;
  height: 250px;
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

.card-info a {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.card-info a:hover {
  background-color: #0056b3;
}
</style>
