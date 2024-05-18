<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="(item, index) in items" :key="index">
        <div class="card">
          <div class="card-img" :style="{ backgroundImage: `url(${item.image})` }"></div>
          <div class="card-content">
            <h3 class="headline">{{ item.title }}</h3>
            <div class="card-info">
              <span>👍 {{ item.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'StoryComponent',
  setup() {
    const items = ref([
      { title: '첫 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 10, comments: 5 },
      { title: '두 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 20, comments: 15 },
      { title: '세 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 30, comments: 25 },
      { title: '네 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 40, comments: 35 },
      { title: '다섯 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 50, comments: 45 },
      { title: '여섯 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 60, comments: 55 },
      { title: '일곱 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 70, comments: 65 },
      { title: '여덟 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 80, comments: 75 },
      { title: '아홉 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 90, comments: 85 },
      { title: '열 번째 모음집', image: 'https://via.placeholder.com/300x300', likes: 100, comments: 95 }
    ])

    return {
      items
    }
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.col {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .col {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }
}

.card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  padding-top: 100%;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-content {
  opacity: 1;
}

.card-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-info {
  opacity: 1;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}
</style>
