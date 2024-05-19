<template>
  <div id="app" class="section-container">
    <div class="overlay">
      <div class="block">
        <h2><span style="color: red">소소하고</span> <span style="color: coral">확실한</span> <span style="color: beige">여행</span></h2>
        <h1>당신의 이야기를 들려주세요</h1>
      </div>
      <button @click="writeStory">작성하기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    writeStory() {
      alert('이야기 작성 페이지로 이동합니다.')
    }
  },
  mounted() {
    document.documentElement.style.overflow = 'auto'
  },
  beforeDestroy() {
    document.documentElement.style.overflow = ''
  }
}
</script>

<style scoped>
.section-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('https://img3.wallspic.com/previews/9/3/3/5/5/155339/155339-writer_writing-writing-writer-author-writers_block-x750.jpg') no-repeat center
    center/cover;
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
  font-size: 3rem;
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
  cursor: default;
  text-align: center;
}

.block h2 {
  text-align: left;
  margin-bottom: 10px;
  font-size: 1.5rem;
}
</style>
