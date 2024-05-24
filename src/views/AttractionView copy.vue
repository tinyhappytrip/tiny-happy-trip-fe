<template>
  <div class="parent-element">
    <div v-if="!fetchSuccess" class="center-panel">
      <div v-if="!loading" class="travel-form">
        <h1 class="title">여행지 추천받기</h1>
        <form @submit.prevent="handleSubmit" class="form-horizontal">
          <div class="form-group">
            <label for="destination">여행지</label>
            <input type="text" id="destination" v-model="destination" placeholder="어디로 떠나시나요?" />
          </div>
          <div class="form-group">
            <label for="departure-date">출발일</label>
            <input type="date" id="departure-date" v-model="departureDate" />
          </div>
          <div class="form-group">
            <label for="companion">동행</label>
            <select id="companion" v-model="companion">
              <option value="연인">연인</option>
              <option value="친구">친구</option>
              <option value="가족">가족</option>
              <option value="혼자">혼자</option>
              <option value="아이">아이</option>
            </select>
          </div>

          <div class="form-group">
            <div class="toggle">
              <label for="companion">여행 타입</label>
              <div class="toggle-group">
                <input type="radio" id="healing" name="힐링" v-model="travelType" value="힐링" />
                <label for="healing" class="toggle-option">힐링</label>
                <input type="radio" id="activity" name="액티비티" v-model="travelType" value="액티비티" />
                <label for="activity" class="toggle-option">액티비티 </label>
                <input type="radio" id="tourism" name="관광" v-model="travelType" value="관광" />
                <label for="tourism" class="toggle-option">관광</label>
              </div>
              <div class="toggle-group">
                <input type="radio" id="date" name="데이트" v-model="travelType" value="데이트" />
                <label for="date" class="toggle-option">데이트</label>
                <input type="radio" id="MZ" name="MZ" v-model="travelType" value="MZ" />
                <label for="MZ" class="toggle-option">MZ</label>
              </div>
            </div>
          </div>
          <button type="submit" class="search-button" @click="getGPTAttractionResponse">검색하기</button>
        </form>
      </div>
      <div v-if="loading" class="spinner-container">
        <div class="spinner"></div>
      </div>
    </div>

    <div v-show="!loading && fetchSuccess" class="results-panel">
      <div class="map-panel">
        <div class="right-container">
          <div id="map" class="map"></div>
        </div>
      </div>

      <div class="swiper-panel">
        <swiper :slides-per-view="4" navigation space-between="40">
          <swiper-slide v-for="(item, index) in items" :key="index">
            <div class="card">
              <img :src="proxyImagePath(item.image)" alt="이미지" class="card-img" />
              <div class="card-content">
                <h2 class="card-title">{{ item.title }}</h2>
                <button class="card-button" @click="viewMore(item.addressName)">둘러보기</button>
              </div>
            </div>
          </swiper-slide>
          <!-- 네비게이션 버튼 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>
<!-- 
<script setup>
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { proxyImagePath } from '@/util/http-commons'
import 'swiper/swiper-bundle.css'
const { VITE_OPENAI_API_KEY } = import.meta.env
import axios from 'axios'
import OpenAI from 'openai'

const KAKAO_API_KEY = '78544c4fa524eb860eea35deffb9d03a'
const destination = ref('')
const departureDate = ref('')
const companion = ref('')
const responseText = ref('')
const attractions = ref([])
const items = ref([])
const fetchSuccess = ref(false)
const loading = ref(false)
const travelType = ref('')
var midx = 0,
  midy = 0
let map
let ps
let markers = [] // 마커를 담을 배열
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getGPTAttractionResponse = async () => {
  loading.value = true
  try {
    const openai = new OpenAI({
      apiKey: VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })

    const question = `
            ${destination.value}에
            ${departureDate.value} 날짜에
            ${companion.value}와 함께 
            ${travelType.value} 하기 위해 여행가는데 추천여행지 장소만 꼭 ,로만 구분해서 다른 말이나  단어만 10개 이상 말해줘
            `

    await delay(1000) // Wait for 1 second before making the request
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: question
        }
      ],
      model: 'gpt-3.5-turbo'
    })

    console.log('chatGPT 결과: ', response.choices[0].message.content)
    responseText.value = response.choices[0].message.content
    attractions.value = responseText.value.split(',').map((str) => str.trim())

    for (let i = 0; i < attractions.value.length; i++) {
      await fetchLocation(attractions.value[i])
    }

    for (let i = 0; i < items.value.length; i++) {
      let item = items.value[i]
      midx += parseFloat(parseFloat(item.x).toFixed(6))
      midy += parseFloat(parseFloat(item.y).toFixed(6))
    }
    midx = midx / items.value.length
    midy = midy / items.value.length

    fetchSuccess.value = true // 상태가 바뀌면서 화면을 그린다
    initializeKakaoMap(midx, midy)
    createMarkers(items.value)
  } catch (error) {
    console.log('chatgpt error')
  } finally {
    loading.value = false
  }
}

const fetchLocation = async (location) => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`
      },
      params: {
        query: location
      }
    })
    const loc = response.data.documents[0]
    if (loc != undefined) {
      // 모든 이미지 검색 결과를 기다린 후 이미지 URL 배열 설정
      const imageUrl = await imagePromise(location)
      if (imageUrl != 0) {
        items.value.push({
          title: location,
          x: loc.x,
          y: loc.y,
          image: imageUrl
        })
      }
    }
  } catch (error) {
    console.error('Error fetching locations:', error)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Check your API key and ensure it is correct.')
    }
  }
}

// 각 장소의 이름으로 카카오 이미지 검색 API 호출하여 대표 이미지 URL 가져오기
const imagePromise = async (name) => {
  const imageResponse = await axios.get('https://dapi.kakao.com/v2/search/image', {
    headers: {
      Authorization: `KakaoAK 78544c4fa524eb860eea35deffb9d03a`
    },
    params: {
      query: name + '풍경 사진'
    }
  })

  // 대표 이미지 URL 배열 반환
  const imageUrls = imageResponse.data.documents
  for (let i = 0; i < imageUrls.length; i++) {
    let isImg = true
    let img = imageUrls[i].image_url
    let imgArr = img.split('//')[1].split('.')
    for (let j = 0; j < imgArr.length; j++) {
      // 스킵할 이미지 단어
      if (
        imgArr.length == 1 ||
        imgArr[j] == 'scrap' ||
        imgArr[j] == 'edit' ||
        imgArr[j] == 'pstatic' ||
        imgArr[j] == 'ohmynews' ||
        imgArr[j] == 'chosun' ||
        imgArr[j] == 'daumcdn' ||
        imgArr[j] == 'daum' ||
        imgArr[j] == 'visitkorea' ||
        imgArr[j] == 'egloos'
      ) {
        isImg = false
        break
      }
    }
    if (isImg) {
      return img
    }
    continue
  }
  return 0
}

const showForm = computed(() => {
  console.log(loading, fetchSuccess)
  return !loading.value && !fetchSuccess.value
})

const initializeKakaoMap = (midx, midy) => {
  try {
    console.log('맵 초기화!')
    console.log(midy, midx)
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(midy, midx),
      level: 10
    }
    map = new kakao.maps.Map(container, options)

    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    ps = new kakao.maps.services.Places()
  } catch (error) {
    console.error('Error initializing Kakao Map:', error)
  }
}

const createMarkers = (items) => {
  // 기존에 추가된 마커들 제거
  markers.forEach((marker) => {
    marker.setMap(null)
  })
  markers = [] // 배열 비우기
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    console.log(item.y, item.x)
    const position = new kakao.maps.LatLng(item.y, item.x) // 장소의 위도, 경도
    const title = item.place_name // 장소 이름
    addMarker(position, title)
  }
}

const addMarker = (position, title) => {
  const marker = new kakao.maps.Marker({
    position: position,
    title: title
  })

  console.log('addmarker!')
  marker.setMap(map) // 생성한 마커를 지도에 추가
  markers.push(marker) // 마커 배열에 추가
}

watch(fetchSuccess, async (newValue) => {
  if (newValue) {
    await nextTick() // DOM이 업데이트된 후 실행
    initializeKakaoMap(midx, midy)
    createMarkers(items.value)
  }
})
</script> -->
<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { proxyImagePath } from '@/util/http-commons'
import 'swiper/swiper-bundle.css'
const { VITE_OPENAI_API_KEY } = import.meta.env
import axios from 'axios'
import OpenAI from 'openai'

const KAKAO_API_KEY = '78544c4fa524eb860eea35deffb9d03a'
const destination = ref('')
const departureDate = ref('')
const companion = ref('')
const responseText = ref('')
const attractions = ref([])
const items = ref([])
const fetchSuccess = ref(false)
const loading = ref(false)
const travelType = ref('')
var midx = 0,
  midy = 0
let map
let ps
let markers = [] // 마커를 담을 배열
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof kakao !== 'undefined') {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Kakao Maps script loading failed'))
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services`
    document.head.appendChild(script)
  })
}

const getGPTAttractionResponse = async () => {
  loading.value = true
  try {
    const openai = new OpenAI({
      apiKey: VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })

    const question = `
            ${destination.value}에
            ${departureDate.value} 날짜에
            ${companion.value}와 함께 
            ${travelType.value} 하기 위해 여행가는데 추천여행지 장소만 꼭 ,로만 구분해서 다른 말이나  단어만 10개 이상 말해줘
            `

    await delay(1000) // Wait for 1 second before making the request
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: question
        }
      ],
      model: 'gpt-3.5-turbo'
    })

    console.log('chatGPT 결과: ', response.choices[0].message.content)
    responseText.value = response.choices[0].message.content
    attractions.value = responseText.value.split(',').map((str) => str.trim())

    for (let i = 0; i < attractions.value.length; i++) {
      await fetchLocation(attractions.value[i])
    }

    for (let i = 0; i < items.value.length; i++) {
      let item = items.value[i]
      midx += parseFloat(parseFloat(item.x).toFixed(6))
      midy += parseFloat(parseFloat(item.y).toFixed(6))
    }
    midx = midx / items.value.length
    midy = midy / items.value.length

    fetchSuccess.value = true // 상태가 바뀌면서 화면을 그린다
    await initializeKakaoMap(midx, midy)
    createMarkers(items.value)
  } catch (error) {
    console.log('chatgpt error')
  } finally {
    loading.value = false
  }
}

const fetchLocation = async (location) => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`
      },
      params: {
        query: location
      }
    })
    const loc = response.data.documents[0]
    if (loc != undefined) {
      // 모든 이미지 검색 결과를 기다린 후 이미지 URL 배열 설정
      const imageUrl = await imagePromise(location)
      if (imageUrl != 0) {
        items.value.push({
          title: location,
          x: loc.x,
          y: loc.y,
          image: imageUrl
        })
      }
    }
  } catch (error) {
    console.error('Error fetching locations:', error)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Check your API key and ensure it is correct.')
    }
  }
}

// 각 장소의 이름으로 카카오 이미지 검색 API 호출하여 대표 이미지 URL 가져오기
const imagePromise = async (name) => {
  const imageResponse = await axios.get('https://dapi.kakao.com/v2/search/image', {
    headers: {
      Authorization: `KakaoAK 78544c4fa524eb860eea35deffb9d03a`
    },
    params: {
      query: name + '풍경 사진'
    }
  })

  // 대표 이미지 URL 배열 반환
  const imageUrls = imageResponse.data.documents
  for (let i = 0; i < imageUrls.length; i++) {
    let isImg = true
    let img = imageUrls[i].image_url
    let imgArr = img.split('//')[1].split('.')
    for (let j = 0; j < imgArr.length; j++) {
      // 스킵할 이미지 단어
      if (
        imgArr.length == 1 ||
        imgArr[j] == 'scrap' ||
        imgArr[j] == 'edit' ||
        imgArr[j] == 'pstatic' ||
        imgArr[j] == 'ohmynews' ||
        imgArr[j] == 'chosun' ||
        imgArr[j] == 'daumcdn' ||
        imgArr[j] == 'daum' ||
        imgArr[j] == 'visitkorea' ||
        imgArr[j] == 'egloos'
      ) {
        isImg = false
        break
      }
    }
    if (isImg) {
      return img
    }
    continue
  }
  return 0
}

const showForm = computed(() => {
  console.log(loading, fetchSuccess)
  return !loading.value && !fetchSuccess.value
})

const initializeKakaoMap = async (midx, midy) => {
  try {
    await loadKakaoMapScript()
    console.log('맵 초기화!')
    console.log(midy, midx)
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(midy, midx),
      level: 10
    }
    map = new kakao.maps.Map(container, options)

    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    ps = new kakao.maps.services.Places()
  } catch (error) {
    console.error('Error initializing Kakao Map:', error)
  }
}

const createMarkers = (items) => {
  // 기존에 추가된 마커들 제거
  markers.forEach((marker) => {
    marker.setMap(null)
  })
  markers = [] // 배열 비우기
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    console.log(item.y, item.x)
    const position = new kakao.maps.LatLng(item.y, item.x) // 장소의 위도, 경도
    const title = item.place_name // 장소 이름
    addMarker(position, title)
  }
}

const addMarker = (position, title) => {
  const marker = new kakao.maps.Marker({
    position: position,
    title: title
  })

  console.log('addmarker!')
  marker.setMap(map) // 생성한 마커를 지도에 추가
  markers.push(marker) // 마커 배열에 추가
}

watch(fetchSuccess, async (newValue) => {
  if (newValue) {
    await nextTick() // DOM이 업데이트된 후 실행
    await initializeKakaoMap(midx, midy)
    createMarkers(items.value)
  }
})
</script>

<style scoped>
.parent-element {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 100px;
}

.center-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
}

.results-panel {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
}

.title {
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 30px;
  color: #333;
}
.travel-form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-bottom: 100px;
}

.form-horizontal {
  display: flex;
  flex-direction: column;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.search-button {
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: 007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
.right-container {
  width: 100%;
}

.map {
  width: 100%;
  height: 400px;
  border-radius: 10px;
}

.map-panel {
  margin-top: 20px;
  height: 400px;
  background-color: #eaeaea;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-panel {
  margin: 50px 0px;
  width: 100%;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.spinner {
  width: 80px;
  height: 80px;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.toggle {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
}

.toggle-group {
  display: flex;
  width: 100%;
  justify-content: center;
}

.toggle-group input[type='radio'] {
  background-color: #333333;
  color: #fff;
  border-color: #333333;
  width: 30%;
  text-align: center;
  display: none;
}

.toggle-option {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  width: 30%;
  text-align: center;
}

.toggle-option:hover {
  background-color: #f0f0f0;
}

.toggle-group input[type='radio']:checked + .toggle-option {
  background-color: #333333;
  color: #fff;
  border-color: #333333;
}

/* 추가 CSS 스타일 */
.card {
  position: relative;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-img {
  width: 100%;
  height: 300px;
  object-fit: cover; /* 이미지를 컨테이너에 맞게 조정 */
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 15px;
  text-align: center;
  box-sizing: border-box;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-button:hover {
  background-color: #0056b3;
}
</style>
