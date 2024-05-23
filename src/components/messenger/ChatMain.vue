<template>
  <div class="chat-main">
    <div class="messages">
      <div class="message" v-for="(message, index) in messages" :key="index" :class="{ sent: userId === message.senderId }">
        <img :src="imagePath(message.receiverImage)" alt="avatar" v-if="!userId === message.senderId" />
        <div class="message-content">
          <div class="message-header">
            <span class="name">{{ message.message }}</span>
            <span class="date">{{ message.sentAt }}</span>
          </div>
          <p>{{ message.text }}</p>
        </div>
        <img :src="imagePath(message.senderImage)" alt="avatar" v-if="userId === message.senderId" />
      </div>
    </div>
    <div class="input-area">
      <!-- <input v-model="newMessage" type="text" placeholder="메시지를 입력하세요" @keyup.enter="sendMessage" />
      <button @click="sendMessage">전송</button> -->
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { getMessageList } from '@/api/chat-api'
import { useAuthStore } from '@/stores/auth'
import { imagePath } from '@/util/http-commons'
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const chatRoomId = ref(route.params.chatRoomId)

const newMessage = ref('')
const userId = ref('')
const messages = ref([])

// const sendMessage = () => {
//   if (newMessage.value.trim() !== '') {
//     chatMessages.value.unshift({
//       name: '조성빈', // 유저 이름, 필요에 따라 동적으로 변경 가능
//       text: newMessage.value,
//       date: new Date().toLocaleDateString(),
//       avatar: './src/assets/main/poorin.png', // 유저 아바타, 필요에 따라 동적으로 변경 가능
//       sentByUser: true
//     })
//     newMessage.value = ''
//     nextTick(() => {
//       scrollToEnd()
//     })
//   }
// }

const scrollToEnd = () => {
  const container = document.querySelector('.messages')
  container.scrollTop = container.scrollHeight
}

const fetchData = async (chatRoomId) => {
  const authStore = useAuthStore()
  userId.value = authStore.userId
  await getMessageList(
    chatRoomId,
    (result) => {
      messages.value = result.data
      console.log(result)
    },
    (error) => {}
  )
}

onMounted(() => {
  fetchData(chatRoomId.value)
})

watch(
  () => route.params.chatRoomId,
  (newChatRoomId) => {
    chatRoomId.value = newChatRoomId
    fetchData(newChatRoomId)
  }
)
</script>

<style scoped>
.chat-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 10px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 10px;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.message.sent {
  flex-direction: row-reverse;
}

.message img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message.sent img {
  margin-left: 10px;
  margin-right: 0;
}

.message-content {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
}

.message.sent .message-content {
  background-color: #d1e7dd;
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

.input-area {
  display: flex;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
