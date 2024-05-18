<template>
  <div>
    <ProfileView />
    <div class="tabs">
      <button @click="activeTab = 'story'">나의 스토리</button>
      <button @click="activeTab = 'collection'">모음집</button>
      <button @click="activeTab = 'likes'">좋아요 목록</button>
    </div>
    <div class="tab-content">
      <MyStory v-if="activeTab === 'story'" />
      <Collection v-if="activeTab === 'collection'" />
      <Likes v-if="activeTab === 'likes'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import UserProfile from '../components/mypage/UserProfile.vue'
// import MyStory from '../components/mypage/MyStory.vue'
// import Collection from '../components/mypage/Collection.vue'
// import Likes from '../components/mypage/Likes.vue'
import ProfileView from './ProfileView.vue'

const activeTab = ref('story')
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
.tab-content {
  padding: 20px;
  border-top: 1px solid #ccc;
}
</style>
