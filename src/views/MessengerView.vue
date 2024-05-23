<template>
  <div class="messenger">
    <div class="chat-sidebar">
      <div class="tabs">
        <button @click="currentTab = 'chat'" :class="{ 'active-tab': currentTab === 'chat' }">채팅</button>
        <button @click="currentTab = 'notifications'" :class="{ 'active-tab': currentTab === 'notifications' }">알림</button>
        <!-- <button class="start-chat-button" @click="showModal = true">+</button> -->
        <font-awesome-icon :icon="['fas', 'plus']" class="start-chat-button" @click="showModal = true" />
      </div>
      <div class="chatroom">
        <div class="notification" v-for="(chatRoom, index) in chatRooms" :key="index">
          <RouterLink class="notification" :to="`/messenger/${chatRoom.chatRoomId}`">
            <img :src="chatRoom.userImage" alt="avatar" />
            <div class="chatroom-content">
              <div class="chatroom-header">
                <span class="name">{{ chatRoom.nickname }}</span>
                <span class="date">{{ formatDate(chatRoom.lastSentAt) }}</span>
              </div>
              <p>{{ chatRoom.lastMessage }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="content">
      <RouterView v-if="currentTab === 'chat'" @close="showModal = false" :userName="userName" :followers="followers" :following="following"></RouterView>
      <div>안녕하세요</div>
      <!-- <ChatMain v-if="currentTab === 'chat'" @close="showModal = false" :userName="userName" :followers="followers" :following="following"> </ChatMain> -->
      <NotificationsMain v-if="currentTab === 'notifications'" @close="showModal = false" :userName="userName" :followers="followers" :following="following" />
    </div>
  </div>
  <ChatModal v-if="showModal" @close="showModal = false" :userName="userName" :followers="followers" :following="following" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ChatMain from '@/components/messenger/ChatMain.vue'
import NotificationsMain from '@/components/messenger/NotificationsMain.vue'
import ChatModal from '@/components/messenger/ChatModal.vue'
import { followList, followingList } from '@/api/user-api'
import { useAuthStore } from '@/stores/auth'
import { getChatRoomList } from '@/api/chat-api'

const currentTab = ref('chat')
const showModal = ref(false)
const loading = ref(false)

const followers = ref([])
const following = ref([])
const userId = ref()
const chatRooms = ref([])
const messages = ref([])

const fetchData = async () => {
  const authStore = useAuthStore()
  userId.value = authStore.userId
  loading.value = true
  await followList(
    userId.value,
    (result) => {
      followers.value = result.data
      console.log(result)
    },
    (error) => {}
  )
  await followingList(
    userId.value,
    (result) => {
      following.value = result.data
      console.log(result)
    },
    (error) => {}
  )
  await getChatRoomList(
    (result) => {
      chatRooms.value = result.data
      console.log(result)
    },
    (error) => {}
  )
}

const formatDate = (rawDate) => {
  const date = new Date(rawDate)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}

onMounted(fetchData)
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

.chat-room {
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
  cursor: default;
}

.notification img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.message-content {
  cursor: pointer;
  flex: 1;
}

.message-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
}

.name {
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.date {
  color: #999;
  font-size: 12px;
}

.message-content p {
  margin: 0;
  cursor: pointer;
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
