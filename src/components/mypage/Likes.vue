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

<script>
export default {
  data() {
    return {
      photos: [
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 1' },
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
      ]
    }
  }
}
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
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  background: #fff;
  padding: 5px;
}

.card-img {
  width: 100%;
  height: auto;
}

.card-title {
  padding: 10px;
  font-size: 1.2rem;
}
</style>
