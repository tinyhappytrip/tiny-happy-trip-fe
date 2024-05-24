<template>
  <div class="chat-main">
    <div class="messages">
      <div class="message" v-for="(message, index) in messages" :key="index" :class="{ sent: Number(userId) === Number(message.senderId) }">
        <img :src="imagePath(message.senderImage)" alt="avatar" v-if="Number(userId) !== Number(message.senderId)" />
        <div class="message-content">
          <div class="message-header">
            <span class="name">{{ message.senderNickname }}</span>
            <span class="date">{{ message.sentAt }}</span>
          </div>
          <p>{{ message.message }}</p>
        </div>
        <img :src="imagePath(message.senderImage)" alt="avatar" v-if="Number(userId) === Number(message.senderId)" />
      </div>
    </div>
    <div class="input-area">
      <input v-model="newMessage" type="text" placeholder="메시지를 입력하세요" @keyup.enter="sendMessage" />
      <button class="btn" @click="sendMessage">전송</button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getMessageList } from '@/api/chat-api'
import { subscribeChat, unsubscribeChat, sendMessage as websocketSendMessage } from '@/util/web-socket'
import { imagePath } from '@/util/http-commons'
import { defineProps } from 'vue'
import { getUserInfo } from '@/api/user-api'

const props = defineProps({
  receiverId: {
    required: true
  },
  chatRoomId: {
    required: true
  }
})

const route = useRoute()
const chatRoomId = ref(props.chatRoomId)
const newMessage = ref('')
const userId = ref('')
const messages = ref([])
const receiverId = ref(props.receiverId)
const currentSubscription = ref(null)
const sender = ref({})

const scrollToEnd = () => {
  const container = document.querySelector('.messages')
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const fetchData = async (chatRoomId) => {
  const authStore = useAuthStore()
  userId.value = authStore.userId
  await getMessageList(
    chatRoomId,
    (result) => {
      messages.value = result.data
      nextTick(() => {
        scrollToEnd()
      })
    },
    (error) => {
      console.error(error)
    }
  )
  await getUserInfo(
    userId.value,
    (success) => {
      sender.value = success.data
      console.log(success)
    },
    (error) => {
      console.error(error)
    }
  )
}

const onMessageReceived = (newMessage) => {
  messages.value.unshift(newMessage)
  nextTick(() => {
    scrollToEnd()
  })
}

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    const message = {
      chatRoomId: currentSubscription.value,
      senderId: userId.value,
      receiverId: receiverId.value, // props로 받은 receiverId 사용
      message: newMessage.value,
      content: sender.value.nickname + '님이 ' + '메세지를 보냈습니다.',
      senderNickname: sender.value.nickname,
      senderImage: sender.value.userImage,
      sentAt: formatDate(new Date())
    }
    console.log(message)
    websocketSendMessage(message)
    newMessage.value = ''
  }
}

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const subscribeToChatRoom = (chatRoomId) => {
  if (currentSubscription.value) {
    unsubscribeChat(currentSubscription.value)
  }
  currentSubscription.value = chatRoomId
  subscribeChat(chatRoomId, onMessageReceived)
}

onMounted(() => {
  fetchData(chatRoomId.value)
  subscribeToChatRoom(chatRoomId.value)
})

watch(
  () => route.params.chatRoomId,
  (newChatRoomId, oldChatRoomId) => {
    if (oldChatRoomId) {
      unsubscribeChat(oldChatRoomId)
    }

    receiverId.value = props.receiverId
    chatRoomId.value = newChatRoomId
    fetchData(newChatRoomId)
    subscribeToChatRoom(newChatRoomId)
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
  background: floralwhite;
  border-left: 1px solid #ddd;
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
}

.message.sent img {
  margin-left: 10px;
  margin-right: 0;
}

.message-content {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
}

.message.sent .message-content {
  background-color: white;
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
  background-color: #af8f6f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #74512d;
}
</style>
