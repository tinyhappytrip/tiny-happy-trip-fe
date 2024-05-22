<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="(item, index) in items" :key="index">
        <div class="card" @click="showDetail(item.collectionId)">
          <div class="card-img">
            <div class="image-container">
              <div v-for="(image, index) in item.images" :key="index">
                <img :src="imagePath(image)" alt="Image" />
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="card-title">{{ computedTitle(item.title) }}</div>
            <div class="card-info">
              <span>👍 {{ item.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, defineEmits } from 'vue'
import { userLikeCollection } from '@/api/collection-api'
import { useAuthStore } from '@/stores/auth'
import { imagePath } from '@/util/http-commons'

const authStore = useAuthStore()
const userId = computed(() => authStore.userId)

const stories = ref({})
const emit = defineEmits(['setSearchCount'])
const items = ref([])
const fetchStories = (userId) => {
  items.value = []
  userLikeCollection(
    userId,
    (result) => {
      items.value = []
      for (let i = 0; i < result.data.length; i++) {
        const collection = result.data[i]
        const collectionImages = []
        if (collection.collectionItems != undefined) {
          if (collection.collectionItems != undefined) {
            for (let i = 0; i < collection.collectionItems.length; i++) {
              collectionImages.push(collection.collectionItems[i].imagePath)
            }
          }
        }

        items.value.push({
          title: collection.title,
          collectionId: collection.collectionId,
          description: collection.description,
          images: collectionImages
        })
      }
      emit('setSearchCount', items.value.length)
    },
    (error) => console.log(error)
  )
}

const computedTitle = (title) => {
  if (title.length > 15) {
    return title.substring(0, 15) + '...더보기'
  }
  return title
}

onMounted(() => {
  fetchStories(userId.value)
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
  cursor: pointer;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding-top: 100%;
}

.card-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: filter 0.3s ease;
}

.card:hover .card-img {
  filter: blur(5px);
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  flex-direction: column; /* 추가 */
}

.card:hover .card-content {
  opacity: 1;
}

.card-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
.card-title {
  color: black;
}
.card-info span {
  margin: 0 10px;
  color: black;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.image-container div {
  position: relative;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container div:hover img {
  transform: scale(1.2); /* 호버 시 이미지 확대 */
}
</style>
