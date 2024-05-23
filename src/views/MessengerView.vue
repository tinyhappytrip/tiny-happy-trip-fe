<template>
  <div class="messenger">
    <div class="chat-sidebar">
      <div class="tabs">
        <button @click="currentTab = 'chat'" :class="{ 'active-tab': currentTab === 'chat' }">메시지</button>
        <!-- <button @click="currentTab = 'notifications'" :class="{ 'active-tab': currentTab === 'notifications' }">알림</button> -->
        <font-awesome-icon :icon="['far', 'message']" class="start-chat-button" @click="showModal = true" />
      </div>
      <div class="chatroom">
        <div class="notification" v-for="(chatRoom, index) in chatRooms" :key="index">
          <RouterLink
            class="notification"
            :to="{
              path: `/messenger/${chatRoom.chatRoomId}`,
              query: { receiverId: chatRoom.userId }
            }"
          >
            <img :src="imagePath(chatRoom.userImage)" alt="avatar" />
            <div class="chatroom-content">
              <div class="chatroom-header">
                <span class="name">{{ chatRoom.nickname }}</span>
                <span class="date">{{ formatDate(chatRoom.lastSentAt) }}</span>
              </div>
              <p style="padding-top: 10px">{{ chatRoom.lastMessage }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="content">
      <RouterView v-if="currentTab === 'chat'" @close="showModal = false" :userName="userName" :followers="followers" :following="following"></RouterView>
      <div class="basic-box" v-if="showBasicBox">
        <div @click="showModal = true">메시지 보내기</div>
      </div>
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
import { imagePath } from '@/util/http-commons'
import { useRoute } from 'vue-router'

const currentTab = ref('chat')
const showModal = ref(false)
const loading = ref(false)
const followers = ref([])
const following = ref([])
const userId = ref()
const chatRooms = ref([])
const route = useRoute()
const receiverId = ref()
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
      console.log(result.data)
      receiverId.value = result.data.userId
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

const showBasicBox = computed(() => {
  return route.path === '/messenger'
})

onMounted(() => {
  fetchData()
})
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
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
}

.tabs {
  border-bottom: 1px solid #ddd;
  height: 10%;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  justify-content: center;
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
  text-decoration: none;
  cursor: default;
  color: black;
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

.content .basic-box {
  width: 100%;
  height: 100%;
  border-left: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}

.content .basic-box div {
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.content .basic-box div:hover {
  color: white;
  background-color: black;
  cursor: pointer;
}

.start-chat-button {
  /* padding: 5px; */
  /* border: 1px solid; */
  /* border-radius: 10px; */
  cursor: pointer;
  margin-right: 20px;
  font-size: 1.3rem;
}

.start-chat-button:hover {
  font-size: 1.5rem;
}

.chatroom {
  height: 90%;
  overflow: auto;
}
</style>
