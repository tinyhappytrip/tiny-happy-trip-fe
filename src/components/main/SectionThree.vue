<template>
  <div id="app" class="section-container">
    <div class="overlay">
      <div class="block">
        <h1>여기는</h1>
        <h1>아직이에여</h1>
        <button @click="writeStory">큰일</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

function writeStory() {
  alert('이야기 작성 페이지로 이동합니다.')
}

onMounted(() => {
  document.documentElement.style.overflow = 'auto'
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>

<style scoped>
.section-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('https://cdn.pixabay.com/photo/2021/05/29/03/00/beach-6292382_1280.jpg') no-repeat center center/cover;
  opacity: 0.8;
}
/* https://get.wallhere.com/photo/books-vintage-1920x1080-px-product-design-780122.jpg */
/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStGDDNY6KDEc3BhtTVwtmW1uX09GTePkQFxvDrkQdHTA&s */
/* https://wallpapers.com/images/hd/writing-pictures-1920-x-1080-xwxmtbnqoenqlu9t.jpg */

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  border: none;
  cursor: pointer;
  border: 2px solid white;
  margin-top: 30px;
  text-align: right;
}

button:hover {
  background-color: white;
  color: black;
}

.block {
  padding: 30px;
  text-align: center;
  position: absolute;
  right: 600px;
  top: 300px;
}
</style>
