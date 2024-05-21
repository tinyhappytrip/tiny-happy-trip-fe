<template>
  <div class="container">
    <div class="row">
      <div v-for="(collection, index) in userCollections" :key="index" class="col">
        <div class="card">
          <CollectionQuarterImage :items="collection.collectionItems" class="card-img"></CollectionQuarterImage>
          <div class="card-title">{{ collection.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { userCollection } from '@/api/collection'
const userCollections = ref([])
const { userId } = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

userCollection(
  userId,
  (result) => {
    userCollections.value = result.data
  },
  (error) => {
    console.log(error)
  }
)
</script>

<style scoped>
.container {
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
  width: 300px;
  height: 300px;
}

.card-img {
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
