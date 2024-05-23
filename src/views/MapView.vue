<template>
  <Header />
  <div class="app-container">
    <div class="left-container">
      <div class="tabs">
        <button @click="changeTab('search')" :class="{ active: tab === 'search' }">검색 목록</button>
        <button @click="changeTab('saved')" :class="{ active: tab === 'saved' }">저장 목록</button>
      </div>

      <div v-if="tab === 'search'" class="tab-content">
        <h3>지도 검색 목록</h3>
        <input v-model="searchQuery" @keyup.enter="searchPlaces" placeholder="검색어를 입력하세요" />
        <ul class="list" ref="scrollContainer" @scroll="handleScroll">
          <li v-for="(item, index) in searchList" :key="index" class="list-item">
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
        <div v-if="isLoading" class="loading">로딩 중...</div>
        <div v-if="noMoreResults" class="no-results">더 이상 결과가 없습니다.</div>
      </div>

      <div v-if="tab === 'saved'" class="tab-content">
        <h3>저장 목록</h3>
        <ul>
          <li v-for="(item, index) in savedList" :key="index" class="list-item">{{ item }}</li>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
const modules = [Navigation]

const tab = ref('search')
const searchQuery = ref('')
const selectedCategory = ref('')
const searchList = ref([])
const savedList = ref(['저장 항목 1', '저장 항목 2', '저장 항목 3'])
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
})

const handleScroll = () => {
  const container = scrollContainer.value
  if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
    loadMore()
  }
}

const loadMore = async () => {
  if (isLoading.value || noMoreResults.value) return

  isLoading.value = true
  page.value += 1
  if (tab.value === 'search') {
    await searchPlaces(false)
  } else if (tab.value === 'saved') {
    await searchByBounds(false)
  }
  isLoading.value = false
}

const searchPlaces = async (reset = true) => {
  if (!searchQuery.value.trim() && !selectedCategory.value) {
    alert('검색어 또는 카테고리를 선택하세요.')
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
    // 카카오 지도 API를 사용하여 키워드로 지도 정보 가져오기
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
  if (!searchQuery.value.trim()) {
    alert('검색어를 입력하세요.')
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
    // 지도 테두리 좌표 가져오기
    const mapBounds = map.getBounds()
    const swLatLng = mapBounds.getSouthWest()
    const neLatLng = mapBounds.getNorthEast()

    // 좌표 값이 잘못되지 않았는지 확인
    if (!swLatLng || !neLatLng) {
      console.error('좌표 값을 가져올 수 없습니다.')
      return
    }

    // 카카오 지도 API를 사용하여 테두리 내 카테고리 검색
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
</script>

<style scoped>
.app-container {
  display: flex;
  width: 70%;
  margin: 0 auto;
  margin-top: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  border-radius: 10px;
  height: 800px;
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
  margin-bottom: 20px;
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
}

.tab-content .list {
  list-style: none;
  height: 610px;
  overflow-y: auto;
}

.category-buttons {
  z-index: 1000;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
}
</style>
