<template>
  <div class="map-panel">
    <div class="right-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script setup>
import { userStory } from '@/api/story-api'
const userStories = ref([])

let map
let ps
let markers = [] // 마커를 담을 배열
var midx = 0,
  midy = 0

const { userId } = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

userStory(
  userId,
  (result) => {
    userStories.value = result.data
    for (let i = 0; i < userStories.value.length; i++) {
      let story = userStories.value[i]
      midx += parseFloat(parseFloat(story.latitude).toFixed(6))
      midy += parseFloat(parseFloat(story.longitude).toFixed(6))
    }
    midx = midx / userStories.value.length
    midy = midy / userStories.value.length

    initializeKakaoMap(midx, midy)
    createMarkers(userStories.value)
  },
  (error) => {
    console.log(error)
  }
)

const initializeKakaoMap = (midx, midy) => {
  try {
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(midy, midx),
      level: 14
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
    const position = new kakao.maps.LatLng(item.longitude, item.latitude) // 장소의 위도, 경도
    const title = item.place_name // 장소 이름
    addMarker(position, title)
  }
}

const addMarker = (position, title) => {
  const marker = new kakao.maps.Marker({
    position: position,
    title: title
  })

  marker.setMap(map) // 생성한 마커를 지도에 추가
  markers.push(marker) // 마커 배열에 추가
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
</style>
