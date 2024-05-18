<template>
  <div>
    <div class="tabs">
      <button @click="activeTab = 'story'">스토리</button>
      <button @click="activeTab = 'collection'">모음집</button>
      <button @click="activeTab = 'likes'">여행지도</button>
    </div>
    <div class="tab-content">
      <Story v-if="activeTab === 'story'" />
      <Collection v-if="activeTab === 'collection'" />
      <Likes v-if="activeTab === 'likes'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('story')
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: start;
}

.tabs button {
  margin-right: 20px;
  padding: 10px 0;
}

.tab-content {
  border-top: 1px solid #ccc;
  padding-bottom: 100px;
}
</style>
