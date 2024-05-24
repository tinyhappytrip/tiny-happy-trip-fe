<template>
  <Header />
  <div class="app-container">
    <div class="app-wrap">
      <div class="left-container">
        <div class="tabs">
          <button @click="changeTab('search')" :class="{ active: tab === 'search' }">검색 목록</button>
        </div>

        <div v-if="tab === 'search'" class="tab-content">
          <select v-model="selectedRegion" @change="updateRegionCoordinates">
            <option value="">지역 선택</option>
            <option value="seoul">서울</option>
            <option value="busan">부산</option>
            <option value="daegu">대구</option>
            <option value="incheon">인천</option>
            <option value="gwangju">광주</option>
            <option value="daejeon">대전</option>
            <option value="ulsan">울산</option>
            <option value="sejong">세종</option>
            <option value="gyeonggi">경기</option>
            <option value="gangwon">강원</option>
            <option value="chungbuk">충북</option>
            <option value="chungnam">충남</option>
            <option value="jeonbuk">전북</option>
            <option value="jeonnam">전남</option>
            <option value="gyeongbuk">경북</option>
            <option value="gyeongnam">경남</option>
            <option value="jeju">제주</option>
          </select>
          <input v-model="searchQuery" @keyup.enter="searchPlaces" placeholder="검색어를 입력하세요" />
          <ul class="list">
            <li v-for="(item, index) in searchList" :key="index" class="list-item">
              <div>
                <swiper :slides-per-view="3" space-between="10" :navigation="true" :modules="modules">
                  <swiper-slide v-for="(imageUrl, imgIndex) in item.image_urls" :key="imgIndex" @click="moveToMarker(item.marker)">
                    <img :src="imageUrl" alt="대표 이미지" class="list-item-image" />
                  </swiper-slide>
                </swiper>
                <strong>{{ item.place_name }}</strong>
                <p style="padding: 10px 0">{{ item.road_address_name }}</p>
                <a :href="'https://map.kakao.com/link/map/' + item.id" target="_blank">자세히 보기</a>
                <!-- Save Button -->
              </div>
            </li>
          </ul>
          <div v-if="isLoading" class="loading">로딩 중...</div>
          <div v-if="noMoreResults" class="no-results">더 이상 결과가 없습니다.</div>
        </div>

        <div v-if="tab === 'saved' && selectedList === null" class="tab-content">
          <h3 style="font-size: 1.2rem">전체 여정 목록: {{ lists.length }}</h3>
          <button @click="showModal = true">새 여정 목록 만들기</button>
          <ul class="list">
            <li v-for="list in lists" :key="list.id" @click="openList(list)" class="list-item">
              {{ list.title }}
            </li>
          </ul>
        </div>
        <div v-if="selectedList" class="tab-content">
          <button @click="selectedList = null">뒤로가기</button>
          <h3>{{ selectedList.title }}</h3>
          <ul class="list">
            <li v-for="item in selectedList.items" :key="item.id" class="list-item">
              <div>
                <swiper :slides-per-view="3" space-between="10" :navigation="true" :modules="modules">
                  <swiper-slide v-for="(imageUrl, imgIndex) in item.image_urls" :key="imgIndex" @click="moveToMarker(item.marker)">
                    <img :src="imageUrl" alt="대표 이미지" class="list-item-image" />
                  </swiper-slide>
                </swiper>
                <strong>{{ item.place_name }}</strong>
                <p>{{ item.road_address_name }}</p>
                <a :href="'https://map.kakao.com/link/map/' + item.id" target="_blank">자세히 보기</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-container">
        <div id="map" class="map"></div>
        <div class="category-buttons">
          <button @click="selectCategory('CE7', '카페')">카페</button>
          <button @click="selectCategory('FD6', '음식점')">음식점</button>
          <button @click="selectCategory('AD5', '숙박')">숙박</button>
          <button @click="selectCategory('AT4', '관광명소')">관광명소</button>
          <button @click="selectCategory('CS2', '편의점')">편의점</button>
        </div>
        <button class="search-button" v-if="showSearchButton" @click="searchPlacesByBounds">현재 지도에서 검색</button>
      </div>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3 class="modal-header">새 여정 목록 만들기</h3>
          <input class="modal-input" v-model="newListTitle" placeholder="여정 제목 입력" />
          <div class="modal-button-box">
            <button @click="createList">만들기</button>
            <button @click="showModal = false">취소</button>
          </div>
        </div>
      </div>
      <div v-if="showSaveModal" class="modal">
        <div class="modal-content">
          <h3 class="modal-header">저장할 목록 선택</h3>
          <ul class="list">
            <li v-for="list in lists" :key="list.id" @click="saveToList(list)" class="list-item">
              {{ list.title }}
            </li>
          </ul>
          <div class="modal-button-box">
            <button @click="showSaveModal = false">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const showSaveModal = ref(false)
const itemToSave = ref(null)
const openSaveModal = (item) => {
  itemToSave.value = item
  showSaveModal.value = true
}
const saveToList = async (list) => {
  const { place_name, id, x, y } = itemToSave.value
  const imageUrl = itemToSave.value.image_urls[0] // 첫번째 이미지 URL 사용
  const response = await axios.post(`/goto-list/${list.id}`, {
    placeName: place_name,
    placeId: id,
    latitude: y,
    longitude: x,
    placeImage: imageUrl
  })
  if (response.status === 200) {
    list.items.push({
      id: Date.now(),
      place_name,
      place_id: id,
      latitude: y,
      longitude: x,
      place_image: imageUrl
    })
    showSaveModal.value = false
  }
}

const modules = [Navigation]

const fetchLists = async () => {
  const response = await axios.get('/goto-list')
  lists.value = response.data
}

const createList = async () => {
  if (newListTitle.value) {
    const response = await axios.post('/goto-list', { title: newListTitle.value })
    if (response.status === 200) {
      lists.value.push({ id: response.data.id, title: newListTitle.value, items: [] })
      newListTitle.value = ''
      showModal.value = false
    }
  }
}

const openList = (list) => {
  selectedList.value = list
}

const showModal = ref(false)
const tab = ref('search')
const searchQuery = ref('')
const selectedRegion = ref('')
const selectedCategory = ref('')
const newListTitle = ref('')
const lists = reactive([])
const selectedList = ref(null)
const searchList = ref([])
const isLoading = ref(false)
const noMoreResults = ref(false)
const pageSize = 15 // 한 페이지당 아이템 개수
const showSearchButton = ref(false)
const categoryNames = {
  CE7: '카페',
  FD6: '음식점',
  AD5: '숙박',
  AT4: '관광명소',
  CS2: '편의점'
}

let page = ref(1)
let ps
let markers = []
let map

const KAKAO_IMAGE_API_KEY = '78544c4fa524eb860eea35deffb9d03a'

const regionCoordinates = {
  seoul: { lat: 37.5665, lng: 126.978 },
  busan: { lat: 35.1796, lng: 129.0756 },
  daegu: { lat: 35.8714, lng: 128.6014 },
  incheon: { lat: 37.4563, lng: 126.7052 },
  gwangju: { lat: 35.1595, lng: 126.8526 },
  daejeon: { lat: 36.3504, lng: 127.3845 },
  ulsan: { lat: 35.5398, lng: 129.3114 },
  sejong: { lat: 36.48, lng: 127.289 },
  gyeonggi: { lat: 37.4138, lng: 127.5183 },
  gangwon: { lat: 37.8228, lng: 128.1555 },
  chungbuk: { lat: 36.6358, lng: 127.4913 },
  chungnam: { lat: 36.6588, lng: 126.6728 },
  jeonbuk: { lat: 35.7175, lng: 127.153 },
  jeonnam: { lat: 34.8161, lng: 126.4629 },
  gyeongbuk: { lat: 36.4919, lng: 128.8889 },
  gyeongnam: { lat: 35.4606, lng: 128.2132 },
  jeju: { lat: 33.4996, lng: 126.5312 }
}

onMounted(() => {
  try {
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(36.35534148122952, 127.29838703302762),
      level: 4
    }
    map = new kakao.maps.Map(container, options)

    var zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    ps = new kakao.maps.services.Places()

    kakao.maps.event.addListener(map, 'dragend', () => {
      showSearchButton.value = true
    })

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      showSearchButton.value = true
    })
  } catch (error) {
    console.error('Kakao 지도 초기화 오류:', error)
  }

  fetchLists()
})

const searchPlaces = async (reset = true) => {
  if (!ps) {
    alert('지도 서비스가 초기화되지 않았습니다.')
    return
  }
  selectedRegion.value = ''
  if (reset) {
    isLoading.value = true
    searchList.value = []
    page.value = 1
    markers.forEach((marker) => marker.setMap(null))
    markers = []
  }

  noMoreResults.value = false

  try {
    const mapResponse = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_IMAGE_API_KEY}`
      },
      params: {
        query: searchQuery.value,
        page: page.value,
        size: pageSize
      }
    })

    const locations = mapResponse.data.documents
    if (locations.length === 0) {
      noMoreResults.value = true
      clearSearchResults()
      return
    }

    const locationNames = locations.map((location) => location.place_name)
    const newLocations = reset ? locations : [...searchList.value, ...locations]

    const imageUrls = await fetchImageUrls(locationNames)

    newLocations.forEach((item, index) => {
      item.image_urls = imageUrls[index] || []
      if (!item.marker) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.y, item.x),
          title: item.place_name
        })
        item.marker = marker
        markers.push(marker)
      }
    })

    searchList.value = newLocations

    if (reset) {
      // 검색된 마커의 중심으로 지도 이동
      let newBounds = new kakao.maps.LatLngBounds()
      searchList.value.forEach((item) => {
        newBounds.extend(new kakao.maps.LatLng(item.y, item.x))
      })
      map.setBounds(newBounds)
    }
  } catch (error) {
    console.error('오류 발생:', error)
  } finally {
    if (reset) {
      isLoading.value = false
    }
    if (searchList.value.length < pageSize) {
      noMoreResults.value = true
    }
  }
}

const searchPlacesByBounds = async (reset = true) => {
  if (!ps) {
    alert('지도 서비스가 초기화되지 않았습니다.')
    return
  }

  if (reset) {
    isLoading.value = true
    searchList.value = []
    page.value = 1
    markers.forEach((marker) => marker.setMap(null))
    markers = []
  }

  noMoreResults.value = false

  try {
    // 지도 테두리 좌표 가져오기
    const mapBounds = map.getBounds()
    const swLatLng = mapBounds.getSouthWest()
    const neLatLng = mapBounds.getNorthEast()

    // 좌표 값이 잘못되지 않았는지 확인
    if (!swLatLng || !neLatLng) {
      console.error('좌표 값을 가져올 수 없습니다.')
      return
    }

    // 카카오 지도 API를 사용하여 테두리 내 키워드 검색
    const mapResponse = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_IMAGE_API_KEY}`
      },
      params: {
        query: searchQuery.value,
        rect: `${swLatLng.getLng()},${swLatLng.getLat()},${neLatLng.getLng()},${neLatLng.getLat()}`,
        page: page.value,
        size: pageSize
      }
    })

    // 검색된 지도 정보의 이름을 추출하여 이미지 검색에 사용
    const locations = mapResponse.data.documents
    if (locations.length === 0) {
      noMoreResults.value = true
      clearSearchResults()
      return
    }

    const locationNames = locations.map((location) => location.place_name)
    const newLocations = reset ? locations : [...searchList.value, ...locations]

    // 각 장소의 이름으로 카카오 이미지 검색 API 호출하여 대표 이미지 URL 가져오기
    const imageUrls = await fetchImageUrls(locationNames)

    // 모든 이미지 검색 결과를 기다린 후 각 장소에 이미지 URL 설정
    newLocations.forEach((item, index) => {
      item.image_urls = imageUrls[index] || []
      if (!item.marker) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.y, item.x),
          title: item.place_name
        })
        item.marker = marker
        markers.push(marker)
      }
    })

    searchList.value = newLocations
  } catch (error) {
    console.error('오류 발생:', error)
  } finally {
    if (reset) {
      isLoading.value = false
    }
    showSearchButton.value = false // 검색 후 검색 버튼 숨기기
    if (searchList.value.length < pageSize) {
      noMoreResults.value = true
    }
  }
}

const searchByBounds = async (reset = true) => {
  if (!selectedCategory.value) {
    alert('카테고리를 선택하세요.')
    return
  }

  if (!ps) {
    alert('지도 서비스가 초기화되지 않았습니다.')
    return
  }

  if (reset) {
    isLoading.value = true
    searchList.value = []
    page.value = 1
    markers.forEach((marker) => marker.setMap(null))
    markers = []
  }

  noMoreResults.value = false

  try {
    const mapBounds = map.getBounds()
    const swLatLng = mapBounds.getSouthWest()
    const neLatLng = mapBounds.getNorthEast()

    if (!swLatLng || !neLatLng) {
      console.error('좌표 값을 가져올 수 없습니다.')
      return
    }

    const mapResponse = await axios.get('https://dapi.kakao.com/v2/local/search/category.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_IMAGE_API_KEY}`
      },
      params: {
        category_group_code: selectedCategory.value,
        rect: `${swLatLng.getLng()},${swLatLng.getLat()},${neLatLng.getLng()},${neLatLng.getLat()}`,
        page: page.value,
        size: pageSize
      }
    })

    const locations = mapResponse.data.documents
    if (locations.length === 0) {
      noMoreResults.value = true
      clearSearchResults()
      return
    }

    const locationNames = locations.map((location) => location.place_name)
    const newLocations = reset ? locations : [...searchList.value, ...locations]

    const imageUrls = await fetchImageUrls(locationNames)

    newLocations.forEach((item, index) => {
      item.image_urls = imageUrls[index] || []
      if (!item.marker) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.y, item.x),
          title: item.place_name
        })
        item.marker = marker
        markers.push(marker)
      }
    })

    searchList.value = newLocations

    if (reset) {
      // 검색된 마커의 중심으로 지도 이동
      let newBounds = new kakao.maps.LatLngBounds()
      searchList.value.forEach((item) => {
        newBounds.extend(new kakao.maps.LatLng(item.y, item.x))
      })
      map.setBounds(newBounds)
    }
  } catch (error) {
    console.error('오류 발생:', error)
  } finally {
    if (reset) {
      isLoading.value = false
    }
    showSearchButton.value = false
    if (searchList.value.length < pageSize) {
      noMoreResults.value = true
    }
  }
}

const fetchImageUrls = async (locationNames) => {
  try {
    const imagePromises = locationNames.map(async (name) => {
      const imageResponse = await axios.get('https://dapi.kakao.com/v2/search/image', {
        headers: {
          Authorization: `KakaoAK ${KAKAO_IMAGE_API_KEY}`
        },
        params: {
          query: name
        }
      })
      return imageResponse.data.documents.slice(0, 5).map((doc) => doc.thumbnail_url)
    })
    return await Promise.all(imagePromises)
  } catch (error) {
    console.error('이미지 검색 오류:', error)
    return locationNames.map(() => [])
  }
}

const clearSearchResults = () => {
  searchList.value = []
  markers.forEach((marker) => marker.setMap(null))
  markers = []
}

const changeTab = (selectedTab) => {
  tab.value = selectedTab
  searchQuery.value = ''
  if (selectedTab === 'search' && searchList.value.length === 0) {
    searchPlaces()
  }
}

const selectCategory = (categoryCode, categoryName) => {
  selectedCategory.value = categoryCode
  searchQuery.value = categoryName
  searchByBounds()
}

const moveToMarker = (marker) => {
  map.panTo(marker.getPosition())
}

const updateRegionCoordinates = () => {
  const region = selectedRegion.value
  if (region && regionCoordinates[region]) {
    const { lat, lng } = regionCoordinates[region]
    map.setCenter(new kakao.maps.LatLng(lat, lng))
    searchPlacesByBounds()
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding-top: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f8f4e1;
  border-radius: 10px;
  height: 100%;
}

.app-wrap {
  display: flex;
  margin: 0 auto;
  height: 800px;
  width: 70%;
}

.left-container {
  width: 30%;
  box-sizing: border-box;
  border-radius: 10px 0 0 10px;
}

.right-container {
  width: 70%;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 0 10px 10px 0;
}

.tabs {
  display: flex;
  justify-content: space-between;
}

.tabs button {
  flex: 1;
  padding: 15px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px 5px 0 0;
  transition: background-color 0.3s ease;
}

.tabs button.active {
  background-color: #ffffff;
  font-weight: bold;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.tab-content {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  position: relative;
}

.tab-content .list {
  list-style: none;
  height: 588px;
  overflow-y: auto;
}

.category-buttons {
  z-index: 10;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}

.category-buttons button {
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-buttons button:hover {
  background-color: #e0e0e0;
}

.search-button {
  z-index: 1000;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #1c86ee;
}

.tab-content input,
.tab-content select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.list-item {
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

.list-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.list-item img.list-item-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

.list-item a {
  color: #1e90ff;
  text-decoration: none;
}

.list-item a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 10px 0;
}

.no-results {
  text-align: center;
  padding: 10px 0;
  color: #888;
  position: absolute;
  bottom: 0;
  width: 90%;
}

/* Existing modal styles */
.modal {
  z-index: 5000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 200px;
  text-align: center;
}

.modal-header {
  font-size: 1.3rem;
  margin-bottom: 30px;
}

.modal-input {
  font-size: 1.1rem;
}

.modal-button-box {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.modal-button-box button {
  width: 30%;
  border: 1px solid #ddd;
  padding: 10px 11px;
  margin: 0 5%;
  border-radius: 10px;
}

.modal-button-box button:hover {
  color: white;
  background-color: black;
}

/* New save modal specific styles */
.list {
  list-style: none;
  padding: 0;
}

.list-item {
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.list-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
