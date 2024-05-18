<template>
  <div class="container">
    <div class="row">
      <div v-for="(photo, index) in photos" :key="index" class="col">
        <div class="card">
          <img :src="photo.url" :alt="photo.title" class="card-img" />
          <div class="card-title">{{ photo.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStory } from '@/api/story'
const userStories = ref([])
const { userId } = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

userStory(
  userId,
  (result) => {
    console.log(result)
    userStories.value = result.data
  },
  (error) => {
    console.log(error)
  }
)
const photos = ref([
  { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1Qw9qKJbrqHv9k1XDHWe0OePKRwXfA4wuX7JWeP2&s', title: 'Photo 1' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 2' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 3' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 4' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 5' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 6' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 1' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 2' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 3' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 4' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 5' },
  { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 6' }
])
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.col {
  flex: 1 0 30%;
  box-sizing: border-box;
  padding: 10px;
}

.card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  background: #fff;
  transition: all 0.3s ease-in-out;
}

.card-img {
  width: 100%;
  height: auto;
  filter: blur(3px);
  transition: filter 0.3s ease-in-out;
}

.card-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 1.2rem;
  font-weight: 400;
  transition: opacity 0.2s ease-in-out;
}

.card:hover .card-img {
  filter: blur(0);
}

.card:hover .card-title {
  opacity: 0;
}
</style>
