<template>
  <div class="container">
    <div class="weather-and-emotion">
      <div>
        <p class="comment_title">날씨</p>
        <p class="comment">날씨는 어땠나요?</p>
        <div class="button-group">
          <button @click="changeWeather('sunny')">
            <img :class="{ 'non-selected': story.weather != 'sunny' }" src="/src/assets/weather/sunny.png" width="35px" />
          </button>
          <button @click="changeWeather('cloud')">
            <img :class="{ 'non-selected': story.weather != 'cloud' }" src="/src/assets/weather/cloud.png" width="35px" />
          </button>
          <button @click="changeWeather('rain')">
            <img :class="{ 'non-selected': story.weather != 'rain' }" src="/src/assets/weather/rainy.png" width="35px" />
          </button>
          <button @click="changeWeather('snow')">
            <img :class="{ 'non-selected': story.weather != 'snow' }" src="/src/assets/weather/snow.png" width="35px" />
          </button>
        </div>
      </div>
      <div>
        <p class="comment_title">감정</p>
        <p class="comment">감정은 어땠나요?</p>
        <div class="button-group">
          <button @click="changeEmotion('happy')">
            <img :class="{ 'non-selected': story.emotion != 'happy' }" src="/src/assets/emotion/happy.png" width="35px" />
          </button>
          <button @click="changeEmotion('sad')">
            <img :class="{ 'non-selected': story.emotion != 'sad' }" src="/src/assets/emotion/sad.png" width="35px" />
          </button>
          <button @click="changeEmotion('angry')">
            <img :class="{ 'non-selected': story.emotion != 'angry' }" src="/src/assets/emotion/angry.png" width="35px" />
          </button>
          <button @click="changeEmotion('amazing')">
            <img :class="{ 'non-selected': story.emotion != 'amazing' }" src="/src/assets/emotion/amazing.png" width="35px" />
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div class="location" @click="searchMode = !searchMode">
      <div>
        <p class="comment_title">위치</p>
        <div class="comment">위치를 추가하세요</div>
      </div>
      <div class="location-right">
        <div v-if="isLocationSelected">{{ selectedLocation }}</div>
        <div v-else>
          <button class="search-button">검색</button>
        </div>
      </div>
    </div>
    <hr />
    <div class="entry-section">
      <div class="comment-square" v-if="searchMode">
        <div class="search-container">
          <div class="search-bar">
            <input type="text" name="searchKeyword" placeholder="Search..." v-model="searchKeyword" />
            <button>
              <img src="/src/assets/main/search.png" width="30px" alt="search icon" />
            </button>
          </div>
          <div class="search-results">
            <div v-for="location in locations" class="result-item" @click="clickedItem(location)">
              {{ location }}
            </div>
          </div>
        </div>
      </div>
      <div class="comment-square" v-else>
        <p class="comment_title">기록</p>
        <div class="comment">당신의 하루를 기록하세요.</div>
        <textarea v-model="story.content" class="content-textfield"></textarea>
      </div>
      <div class="toggle">
        <div>공개 범위 설정</div>
        <div class="radio-group">
          <label class="radio-option"> <input v-model="story.scope" type="radio" name="visibility" value="PUBLIC" /> 공개 </label>
          <label class="radio-option"> <input v-model="story.scope" type="radio" name="visibility" value="PRIVATE" /> 비공개 </label>
          <label class="radio-option"> <input v-model="story.scope" type="radio" name="visibility" value="FOLLOWER" /> 팔로워만 공개 </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const { story } = defineProps({
  story: Object
})

const locations = ref(['제주도1', '제주도2', '제주도3', '제주도1', '제주도1', '제주도1'])
const searchKeyword = ref('')
const selectedLocation = ref('')
const isLocationSelected = ref(false)
const searchMode = ref(false)

const changeWeather = (weather) => {
  story.weather = weather
}

const changeEmotion = (emotion) => {
  story.emotion = emotion
}

const clickedItem = (location) => {
  isLocationSelected.value = true
  searchMode.value = false
  selectedLocation.value = location
  story.location = location
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial, sans-serif';
}

.weather-and-emotion {
  display: flex;
  justify-content: space-between;
}

.weather-and-emotion > div {
  width: 48%;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.comment_title {
  font-size: 18px;
  font-weight: bold;
}

.comment {
  color: gray;
  font-size: 14px;
}

.location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
}

.location-right {
  display: flex;
  align-items: center;
}

.search-button {
  color: black;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
}

.entry-section {
  padding: 10px 0;
}

.comment-square {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  height: 250px;
}

.content-textfield {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  height: 200px;
}

.search-container {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin: 10px;
}

.search-bar input {
  width: 90%;
  padding: 5px;
  border: none;
  outline: none;
}

.search-bar button {
  background: none;
  border: none;
  cursor: pointer;
}

.search-bar button img {
  width: 16px;
  height: 16px;
}

.search-results {
  margin-top: 10px;
  max-height: 150px;
  overflow-y: scroll;
}

.result-item {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.result-item:hover {
  background-color: #f1f1f1;
}

.toggle {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.radio-option {
  margin-bottom: 10px;
}

.non-selected {
  opacity: 0.5;
}
</style>
