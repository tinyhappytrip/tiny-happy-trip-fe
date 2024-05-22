<template>
  <div class="app-container">
    <div class="left-container">
      <div class="tabs">
        <button @click="tab = 'search'" :class="{ active: tab === 'search' }">검색 목록</button>
        <button @click="tab = 'saved'" :class="{ active: tab === 'saved' }">저장 목록</button>
      </div>

      <div v-if="tab === 'search'" class="tab-content">
        <h3>지도 검색 목록</h3>
        <input v-model="searchQuery" @keyup.enter="searchPlaces" placeholder="검색어를 입력하세요" />
        <ul>
          <li v-for="(item, index) in searchList" :key="index">
            <div>
              <strong>{{ item.place_name }}</strong> - {{ item.address_name }}
              <p>카테고리: {{ item.category_name }}</p>
              <p>전화번호: {{ item.phone }}</p>
              <p>거리: {{ item.distance }}m</p>
              <!-- 여기에 추가 정보를 원하는 만큼 표시할 수 있습니다 -->
              <a :href="'https://map.kakao.com/link/map/' + item.id" target="_blank">자세히 보기</a>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="tab === 'saved'" class="tab-content">
        <h3>저장 목록</h3>
        <ul>
          <li v-for="(item, index) in savedList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="right-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tab = ref('search')
const searchQuery = ref('')
const searchList = ref([])
const savedList = ref(['저장 항목 1', '저장 항목 2', '저장 항목 3'])

let map
let ps
let markers = [] // 마커를 담을 배열

onMounted(() => {
  try {
    // 카카오 맵 초기화
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(36.35534148122952, 127.29838703302762),
      level: 4
    }
    map = new kakao.maps.Map(container, options)

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    ps = new kakao.maps.services.Places()

    // 검색 결과로 받은 장소 정보를 이용하여 마커 생성 및 추가
  } catch (error) {
    console.error('Error initializing Kakao Map:', error)
  }
})

const createMarkers = (data) => {
  // 기존에 추가된 마커들 제거
  markers.forEach((marker) => {
    marker.setMap(null)
  })
  markers = [] // 배열 비우기

  // 장소 정보를 이용하여 마커 생성 및 추가
  data.forEach((item) => {
    const position = new kakao.maps.LatLng(item.y, item.x) // 장소의 위도, 경도
    const title = item.place_name // 장소 이름
    addMarker(position, title)
  })
}

const addMarker = (position, title) => {
  const marker = new kakao.maps.Marker({
    position: position,
    title: title
  })
  marker.setMap(map) // 생성한 마커를 지도에 추가
  markers.push(marker) // 마커 배열에 추가
}

const searchPlaces = () => {
  if (!searchQuery.value.trim()) {
    alert('검색어를 입력하세요.')
    return
  }

  if (!ps) {
    alert('Places service is not initialized.')
    return
  }

  ps.keywordSearch(searchQuery.value, placesSearchCB)
}

const placesSearchCB = (data, status, pagination) => {
  if (status === kakao.maps.services.Status.OK) {
    searchList.value = data
    createMarkers(data) // 검색 결과로 받은 장소 정보를 이용하여 마커 생성 및 추가
    console.log(data)
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert('검색 결과가 없습니다.')
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert('검색 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  padding-top: 180px;
  width: 60%;
  margin: 0 auto;
}

.left-container {
  width: 25%;
  margin-right: 10px;
  height: 600px;
}

.right-container {
  width: 75%;
}

.map {
  width: 100%;
  height: 600px;
}

.tabs {
  display: flex;
  justify-content: space-between;
  height: 10%;
}

.tabs button {
  flex: 1;
  padding: 10px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-bottom: none;
}

.tabs button.active {
  background-color: #fff;
  font-weight: bold;
}

.tab-content {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
  height: 90%;
}

.tab-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
</style>
