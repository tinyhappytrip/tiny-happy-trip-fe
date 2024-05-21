<template>
  <div class="user-container">
    <div class="tabs">
      <button class="tab" @click="fetchFollowing" :class="{ active: activeTab === 'following' }">Following</button>
      <button class="tab" @click="fetchFollowers" :class="{ active: activeTab === 'followers' }">Followers</button>
    </div>
    <div class="user-list">
      <ul>
        <li v-for="user in users" :key="user.id">
          <img :src="user.avatar" alt="User Avatar" class="avatar" />
          <span>{{ user.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserFollowing, getUserFollowers } from '@/api/follow-api' // Assume these are your API functions

const activeTab = ref('following')
const users = ref([])

const fetchFollowing = async () => {
  activeTab.value = 'following'
  const response = await getUserFollowing()
  users.value = response.data
}

const fetchFollowers = async () => {
  activeTab.value = 'followers'
  const response = await getUserFollowers()
  users.value = response.data
}

// Fetch following users by default
fetchFollowing()
</script>

<style scope>
.user-container {
  width: 600px;
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.tab:hover {
  background-color: #e0e0e0;
}

.tab.active {
  background-color: #007bff;
  color: white;
}

.user-list {
  max-height: 400px;
  overflow-y: auto;
}

.user-list ul {
  list-style: none;
  padding: 0;
}

.user-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.user-list li:hover {
  background-color: #f1f1f1;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
