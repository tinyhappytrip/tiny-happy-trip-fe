<template>
  <div class="messenger">
    <div class="chat-sidebar">
      <div class="tabs">
        <button @click="currentTab = 'chat'" :class="{ 'active-tab': currentTab === 'chat' }">채팅</button>
        <button @click="currentTab = 'notifications'" :class="{ 'active-tab': currentTab === 'notifications' }">알림</button>
        <!-- <button class="start-chat-button" @click="showModal = true">+</button> -->
        <font-awesome-icon :icon="['fas', 'plus']" class="start-chat-button" @click="showModal = true" />
      </div>
      <div class="messages">
        <div class="notification" v-for="(message, index) in messages" :key="index">
          <img :src="message.avatar" alt="avatar" />
          <div class="message-content">
            <div class="message-header">
              <span class="name">{{ message.name }}</span>
              <span class="date">{{ message.date }}</span>
            </div>
            <p>{{ message.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <ChatMain v-if="currentTab === 'chat'" @close="showModal = false" :userName="userName" :followers="followers" :following="following"> </ChatMain>
      <NotificationsMain v-if="currentTab === 'notifications'" @close="showModal = false" :userName="userName" :followers="followers" :following="following" />
    </div>
  </div>
  <ChatModal v-if="showModal" @close="showModal = false" :userName="userName" :followers="followers" :following="following" />
</template>
<script setup>
import { ref } from 'vue'
import ChatMain from '@/components/messenger/ChatMain.vue'
import NotificationsMain from '@/components/messenger/NotificationsMain.vue'
import ChatModal from '@/components/messenger/ChatModal.vue'

const currentTab = ref('chat')
const showModal = ref(false)
const userName = ref('조성빈')

const followers = ref([
  { name: '내팔로우1', title: 'NAVER 소프트웨어 엔지니어', avatar: './src/assets/main/poorin.png' },
  { name: '내팔로우2', title: '컬리 백엔드 개발자', avatar: './src/assets/main/poorin.png' },
  { name: '내팔로우1', title: 'NAVER 소프트웨어 엔지니어', avatar: './src/assets/main/poorin.png' },
  { name: '내팔로우1', title: 'NAVER 소프트웨어 엔지니어', avatar: './src/assets/main/poorin.png' },
  { name: '내팔로우1', title: 'NAVER 소프트웨어 엔지니어', avatar: './src/assets/main/poorin.png' },
  { name: '내팔로우1', title: 'NAVER 소프트웨어 엔지니어', avatar: './src/assets/main/poorin.png' },
  { name: '내팔로우1', title: 'NAVER 소프트웨어 엔지니어', avatar: './src/assets/main/poorin.png' }
])

const following = ref([
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' },
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' },
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' },
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' },
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' },
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' },
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' },
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' },
  { name: '내가팔로잉', title: 'Staff Back-end Engineer L6-2 IC', avatar: './src/assets/main/poorin.png' }
])

const messages = ref([
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' },
  { name: '이름', text: '안녕하세요 반갑습니다........', date: '4월 12일', avatar: './src/assets/main/poorin.png' }
  // 다른 메시지들 추가
])
</script>
<style scoped>
.messenger {
  display: flex;
  width: 60%;
  margin: 0 auto;
  margin-top: 150px;
  height: 65vh;
}

.chat-sidebar {
  width: 300px;
  height: 65vh;
}

.tabs {
  border-bottom: 1px solid #ddd;
  height: 10%;
  display: flex;
  align-items: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  justify-content: space-between;
}

.tabs button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tabs button:hover {
  font-weight: bold;
}

.tabs .active-tab {
  font-weight: bold;
}

.messages {
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px 15px;
  overflow: auto;
  height: 90%;
}

.notification {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.notification img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.name {
  font-weight: bold;
  margin-right: 10px;
}

.date {
  color: #999;
  font-size: 12px;
}

.message-content p {
  margin: 0;
  font-size: 14px;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}

.start-chat-button {
  padding: 10px;
  border: 1px solid;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 20px;
  margin-left: auto;
}

.start-chat-button:hover {
  background-color: black;
  color: white;
}
</style>
