<template>
  <div class="app-container">
    <div class="left-container">
      <v-tabs v-model="tab">
        <v-tab>검색 목록</v-tab>
        <v-tab>저장 목록</v-tab>

        <v-tab-item>
          <div class="search-list">
            <h3>지도 검색 목록</h3>
            <ul>
              <li v-for="(item, index) in searchList" :key="index">{{ item }}</li>
            </ul>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="saved-list">
            <h3>저장 목록</h3>
            <ul>
              <li v-for="(item, index) in savedList" :key="index">{{ item }}</li>
            </ul>
          </div>
        </v-tab-item>
      </v-tabs>
    </div>
    <div class="right-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      searchList: ['검색 항목 1', '검색 항목 2', '검색 항목 3'],
      savedList: ['저장 항목 1', '저장 항목 2', '저장 항목 3']
    }
  },
  mounted() {
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      }
      new kakao.maps.Map(mapContainer, mapOption)
    }
  }
}
</script>

<style>
.app-container {
  display: flex;
  height: 100%;
  padding-top: 200px;
  width: 60%;
  margin: 0 auto;
}

.left-container {
  width: 30%;
  border-right: 1px solid #ddd;
}
.right-container {
  width: 70%;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
