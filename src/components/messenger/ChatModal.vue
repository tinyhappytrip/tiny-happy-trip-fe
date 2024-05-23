<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h3>메시지</h3>
        <button @click="closeModal" class="close-button">X</button>
      </div>
      <div class="tab-box">
        <div :class="['modal-tabs', { active: currentTab === 'followers' }]" @click="currentTab = 'followers'">
          <span>팔로워</span>
          <span class="count">{{ followers.length }}</span>
        </div>
        <div :class="['modal-tabs', { active: currentTab === 'following' }]" @click="currentTab = 'following'">
          <span>팔로잉</span>
          <span class="count">{{ following.length }}</span>
        </div>
      </div>
      <div class="modal-content">
        <div v-if="currentTab === 'followers'">
          <!-- 팔로워 리스트 -->
          <div class="user" v-for="(user, index) in props.followers" :key="index">
            <img :src="user.userImage" alt="avatar" />
            <div class="profile">
              <p class="name">{{ user.nickname }}</p>
            </div>
            <button class="chat-button" @click="createChatRoom(user.userId)">채팅</button>
          </div>
        </div>
        <div v-else>
          <!-- 팔로잉 리스트 -->
          <div class="user" v-for="(user, index) in props.following" :key="index">
            <img :src="imagePath(user.userImage)" alt="avatar" />
            <div class="profile">
              <p class="name">{{ user.nickname }}</p>
            </div>

            <button class="chat-button" @click="createChatRoom(user.userId)">채팅</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getChatRoomId } from '@/api/chat-api'
import router from '@/router'
import { imagePath } from '@/util/http-commons'
import { ref } from 'vue'

const props = defineProps({
  followers: Array,
  following: Array
})
const currentTab = ref('followers')

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const createChatRoom = (user1) => {
  console.log(user1)
  getChatRoomId(
    user1,
    (success) => {
      console.log(success.data)
      router.push(`/messenger/${success.data}`)
      emit('close')
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background-color: white;
  border-radius: 8px;
  width: 450px;
  height: 500px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;
  height: 15%;
}

.modal-header h3 {
  flex-grow: 1;
  text-align: center;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  right: 16px;
}

.tab-box {
  display: flex;
  justify-content: center;
  height: 10%;
}

.modal-tabs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  cursor: pointer;
  background-color: #f0f0f0; /* Default background color */
  color: #333; /* Default text color */
  border-bottom: 2px solid transparent;
  transition: background-color 0.3s, color 0.3s;
}

.modal-tabs:hover {
  background-color: #e0e0e0; /* Hover background color */
}

.modal-tabs.active {
  background-color: #333;
  color: white;
}

.count {
  margin-top: 5px;
  font-size: 12px;
}

.modal-content {
  height: 75%;
  overflow: auto;
}

.user {
  display: flex;
  padding: 15px 20px;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s;
  cursor: pointer;
}

.user:hover {
  background-color: #f9f9f9;
}

.user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
}

.profile {
  flex: 1;
}

.name {
  font-weight: bold;
}

.chat-button {
  padding: 5px 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chat-button:hover {
  background-color: #555;
}
</style>
