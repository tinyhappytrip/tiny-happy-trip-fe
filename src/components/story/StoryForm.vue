<template>
  <div>
    <div class="weather-and-emotion">
      <div>
        <p class="comment_title">날씨</p>
        <p class="comment">날씨는 어땠나요?</p>
        <div>
          <button @click="changeWeather('sunny')">
            <img :class="{ 'non-selected' : props.story.weather != 'sunny' }" src="/src/assets/weather/sunny.png" width="35px" />
          </button>
          <button @click="changeWeather('cloud')">
            <img :class="{ 'non-selected' : props.story.weather != 'cloud' }" src="/src/assets/weather/cloud.png" width="35px" />
          </button>
          <button @click="changeWeather('rain')">
            <img :class="{ 'non-selected' : props.story.weather != 'rain' }" src="/src/assets/weather/rainy.png" width="35px" />
          </button>
          <button @click="changeWeather('snow')">
            <img :class="{ 'non-selected' : props.story.weather != 'snow' }" src="/src/assets/weather/snow.png" width="35px" />
          </button>
        </div>
      </div>
      <div>
        <p class="comment_title">감정</p>
        <p class="comment">감정은 어땠나요?</p>
        <button @click="changeEmotion('happy')">
          <img :class="{ 'non-selected' : props.story.emotion != 'happy' }" src="/src/assets/emotion/happy.png" width="35px" />
        </button>
        <button @click="changeEmotion('sad')">
          <img :class="{ 'non-selected' : props.story.emotion != 'sad' }" src="/src/assets/emotion/sad.png" width="35px" />
        </button>
        <button @click="changeEmotion('angry')">
          <img :class="{ 'non-selected' : props.story.emotion != 'angry' }" src="/src/assets/emotion/angry.png" width="35px" />
        </button>
        <button @click="changeEmotion('amazing')">
          <img :class="{ 'non-selected' : props.story.emotion != 'amazing' }" src="/src/assets/emotion/amazing.png" width="35px" />
        </button>
      </div>
    </div>
    <hr />
    <div class="location">
      <div style="display: flex" @click="searchMode = !searchMode">
        <div>
          <p class="comment_title">위치</p>
          <div class="comment">위치를 추가하세요</div>
        </div>
        <div class="location-right" style="margin-left: auto">
          <div v-if="isLocationSelected">{{ selectedLocation }}</div>
          <div v-else>
            <button style="margin-right: 10px">검색</button>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div style="padding: 10px 0">
      <div class="comment-square" v-if="searchMode">
        <div class="search-container">
          <div class="search-bar">
            <input type="text" name="searchKeyword" placeholder="Search..." />
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
        <p class="comment">기록</p>
        <div class="comment">당신의 하루를 기록하세요.</div>
        <textarea v-model="props.story.content" class="content-textfield"></textarea>
      </div>
      <div class="toggle">
        <div>공개 범위 설정</div>
        <div class="radio-group">
        <label class="radio-option">
            <input v-model="props.story.scope" type="radio" name="visibility" value="PUBLIC"> 공개
        </label>
        <label class="radio-option">
            <input v-model="props.story.scope" type="radio" name="visibility" value="PRIVATE"> 비공개
        </label>
        <label class="radio-option">
            <input v-model="props.story.scope" type="radio" name="visibility" value="FOLLOWER"> 팔로워만 공개
        </label>
    </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, toRefs } from "vue";

const props = defineProps({
  story: Object
})


const story = toRefs(props)

const locations = ref([
  "제주도1",
  "제주도2",
  "제주도3",
  "제주도1",
  "제주도1",
  "제주도1",
  "제주도1",
  "제주도1",
]);
const searchKeyword = ref("");
const selectedLocation = ref("");
const isLocationSelected = ref(false);
const searchMode = ref(false);

const changeWeather = (weather) => {
  props.story.weather = weather;
};

const changeEmotion = (emotion) => {
  props.story.emotion = emotion;
};

const searchModeToggle = () => {
  searchMode.value = !searchMode.value;
};
const clickedItem = (location) => {
  isLocationSelected.value = true;
  searchMode.value = false;
  selectedLocation.value = location;
  props.story.location = location;
};
</script>

<style scoped>
.weather-and-emotion {
  display: flex;
}

.weather-and-emotion > * {
  margin-right: 10px;
  width: 50%;
}

.weather-and-emotion button {
  margin: 5px; /* 버튼 사이 간격 조정 */
}

.comment_title {
  font-size: 20px;
}

.comment {
  color: gray;
  font-size: 13px;
}

.location-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  float: right;
}

.content-textfield {
  width: 430px;
  height: 80%;
  border-bottom: 1px solid black;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f9f9f9;
}

.search-container {
  width: 430px;
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
  overflow-y: scroll; /* Ensures the scrollbar is visible when content overflows */
}

.result-item {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.toggle {
  display: flex;
}

.comment-square {
  width: 446px;
  height: 250px;
}

.non-selected {
  opacity: 50%;
}
.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.radio-option {
  margin: 5px 0;
}

</style>
