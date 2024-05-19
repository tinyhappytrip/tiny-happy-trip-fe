<template>
  <div id="app" class="section-container">
    <div class="overlay">
      <div class="block">
        <h2>행복했던 순간들을 모아서</h2>
      </div>
      <div class="sub-block">
        <h3>이야기 모음집</h3>
      </div>
      <SectionTwoGrid />
      <button @click="writeStory">더보기</button>
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
  background: url('https://cdn.pixabay.com/photo/2020/05/09/07/59/cassettes-5148645_1280.jpg') no-repeat center center/cover;
  opacity: 0.8;
}

/* https://cdn.pixabay.com/photo/2020/05/09/07/59/cassettes-5148645_1280.jpg */
/* https://get.wallhere.com/photo/books-vintage-1920x1080-px-product-design-780122.jpg */
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

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  border: none;
  cursor: pointer;
  border: 2px solid white;
  margin-top: 50px;
  text-align: right;
}

button:hover {
  background-color: white;
  color: black;
}

.block {
  display: flex;
  width: 50%;
  justify-content: start;
  cursor: default;
}

.block h2 {
  font-size: 3.5rem;
}

.sub-block {
  display: flex;
  justify-content: end;
  cursor: default;
  width: 15%;
}

.sub-block h3 {
  font-size: 2rem;
}
</style>
