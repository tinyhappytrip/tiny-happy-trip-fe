<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'KakaoMap',
  props: {
    location: {
      type: String
    }
  },
  setup(props) {
    const mapContainer = ref(null)

    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
          resolve(window.kakao)
        } else {
          const script = document.createElement('script')
          script.onload = () => {
            const checkKakaoReady = setInterval(() => {
              if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
                clearInterval(checkKakaoReady)
                resolve(window.kakao)
              }
            }, 100)
          }
          script.onerror = () => reject(new Error('Failed to load Kakao Map script'))
          script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=b49aadae672b616a1fe4c04bc0d3699a&libraries=services'
          document.head.appendChild(script)
        }
      })
    }

    const initializeMap = (kakao) => {
      const geocoder = new kakao.maps.services.Geocoder()

      geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
          const map = new kakao.maps.Map(mapContainer.value, {
            center: coords,
            level: 3
          })
          new kakao.maps.Marker({
            map: map,
            position: coords
          })
        } else {
          console.error('Geocoder failed with status:', status)
        }
      })
    }

    onMounted(() => {
      loadKakaoMapScript()
        .then((kakao) => initializeMap(kakao))
        .catch((error) => console.error('Error loading Kakao Map script:', error))
    })

    return {
      mapContainer
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 200px;
}
</style>
