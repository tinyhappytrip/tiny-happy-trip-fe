<template>
  <div class="container" @click="handleOutsideClick">
    <div class="weather-and-emotion">
      <div>
        <p class="comment_title">날씨</p>
        <div class="button-group">
          <button @click="changeWeather('sunny')">
            <img :class="{ 'non-selected': story.weather != 'sunny' }" src="/src/assets/weather/sunny.png" width="35px" />
          </button>
          <button @click="changeWeather('cloud')">
            <img :class="{ 'non-selected': story.weather != 'cloud' }" src="/src/assets/weather/cloud.png" width="35px" />
          </button>
          <button @click="changeWeather('rain')">
            <img :class="{ 'non-selected': story.weather != 'rainy' }" src="/src/assets/weather/rainy.png" width="35px" />
          </button>
          <button @click="changeWeather('snow')">
            <img :class="{ 'non-selected': story.weather != 'snow' }" src="/src/assets/weather/snow.png" width="35px" />
          </button>
        </div>
      </div>
    </div>
    <div class="weather-and-emotion">
      <div>
        <p class="comment_title">감정</p>
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
    <div class="location">
      <div>
        <p class="comment_title">위치</p>
        <div class="comment" @click.stop="toggleSearchMode">{{ isLocationSelected ? selectedLocation : '위치를 추가하세요' }}</div>
        <button class="search-button" @click.stop="toggleSearchMode">검색</button>
        <div class="search-container" v-if="searchMode" @click.stop="">
          <div class="search-bar">
            <input ref="searchInput" type="text" name="searchKeyword" placeholder="검색" :value="searchKeyword" @input="updateSearchKeyword" />
            <button>
              <img src="/src/assets/main/search.png" width="30px" alt="search icon" />
            </button>
          </div>
          <div class="search-results">
            <div v-for="location in locations" :key="location.id" class="result-item" @click="clickedItem(location)">
              <p style="font-size: 0.8rem">{{ location.place_name }}</p>
              <span style="font-size: 0.7rem">{{ location.road_address_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="entry-section">
      <div class="comment-square">
        <p class="comment_title">기록</p>
        <textarea v-model="story.content" class="content-textfield"></textarea>
      </div>
      <div class="toggle">
        <div class="comment_title">공개 범위 설정</div>
        <div class="toggle-group">
          <input type="radio" id="public" name="visibility" v-model="story.scope" value="PUBLIC" />
          <label for="public" class="toggle-option">공개</label>
          <input type="radio" id="followers-only" name="visibility" v-model="story.scope" value="FOLLOWER" />
          <label for="followers-only" class="toggle-option">팔로워 </label>
          <input type="radio" id="private" name="visibility" v-model="story.scope" value="PRIVATE" />
          <label for="private" class="toggle-option">비공개</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, nextTick } from 'vue'
import axios from 'axios'

const { story } = defineProps({
  story: Object
})

const searchKeyword = ref('')
const locations = ref([])
const selectedLocation = ref('')
const isLocationSelected = ref(false)
const searchMode = ref(false)

const searchInput = ref(null)

const KAKAO_API_KEY = 'e86f69e6ec0994a1f096b9953c71f6d7'

const changeWeather = (weather) => {
  story.weather = weather
}

const changeEmotion = (emotion) => {
  story.emotion = emotion
}

const clickedItem = (location) => {
  isLocationSelected.value = true
  searchMode.value = false
  selectedLocation.value = location.place_name
  story.placeName = location.place_name
  story.placeId = location.id
  story.roadAddressName = location.road_address_name
  searchKeyword.value = ''
  locations.value = []
  story.latitude = location.x
  story.longitude = location.y
}

const handleOutsideClick = (event) => {
  if (searchMode.value && !event.target.closest('.relative-container')) {
    searchMode.value = false
    searchKeyword.value = ''
    locations.value = []
  }
}

const toggleSearchMode = () => {
  searchMode.value = !searchMode.value
  if (searchMode.value) {
    nextTick(() => {
      searchInput.value.focus()
    })
  }
}

const updateSearchKeyword = (event) => {
  searchKeyword.value = event.target.value
  fetchLocations()
}

const fetchLocations = async () => {
  // if (searchKeyword.value.trim() === '') {
  //   locations.value = []
  //   return
  // }

  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`
      },
      params: {
        query: searchKeyword.value
      }
    })
    console.log(response.data)
    story.latitude = response.data
    story.longitude = response.data.documents.y
    locations.value = response.data.documents
  } catch (error) {
    console.error('Error fetching locations:', error)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Check your API key and ensure it is correct.')
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: calc(100% - 56px);
  background: white;
  margin: 56px 0;
  padding: 20px;
}

.weather-and-emotion {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
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
  padding: 20px 0;
}

.comment {
  color: gray;
  font-size: 14px;
  cursor: pointer;
}

.location {
  position: relative;
  padding: 10px 0;
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.location-right {
  display: flex;
  align-items: center;
}

.search-button {
  position: absolute;
  color: black;
  bottom: 0;
  cursor: pointer;
  right: 0;
  display: block;
  padding-bottom: 10px;
}

.entry-section {
  padding: 10px 0;
}

.content-textfield {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  height: 180px;
  resize: none;
}

.search-container {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  position: absolute;
  background: white;
  z-index: 10;
  height: 290px;
  margin-top: -30px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin: 10px 0;
  height: 10%;
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
  height: 80%;
  overflow-y: auto;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
}

.result-item {
  padding: 12px 5px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.result-item:hover {
  background-color: #f1f1f1;
}

.toggle {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
}

.toggle-group {
  display: flex;
  width: 70%;
  justify-content: space-between;
}

.toggle-group input[type='radio'] {
  background-color: #333333;
  color: #fff;
  border-color: #333333;
  width: 25%;
  text-align: center;
  display: none;
}

.toggle-option {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.toggle-option:hover {
  background-color: #f0f0f0;
}

.toggle-group input[type='radio']:checked + .toggle-option {
  background-color: #333333;
  color: #fff;
  border-color: #333333;
}

.non-selected {
  opacity: 0.5;
}
</style>
