<template>
  <div class="profile-container">
    <div class="profile-header">
      <img class="profile-picture" src="@/assets/main/poorin.png" alt="Profile Picture" />
      <div class="profile-info"></div>
    </div>
    <h2 class="profile-name">SUMBIM</h2>
    <p class="profile-description">프론트엔드 개발자 입니다.</p>
    <div class="profile-stats">
      <div class="stat">
        <span class="stat-number">245</span>
        <span class="stat-label">게시물</span>
      </div>
      <div class="stat">
        <span class="stat-number">189</span>
        <span class="stat-label">팔로워</span>
      </div>
      <div class="stat">
        <span class="stat-number">132</span>
        <span class="stat-label">팔로잉</span>
      </div>
    </div>
    <div class="profile-actions">
      <button class="follow-button">팔로우</button>
      <button class="message-button">메시지</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const profile = ref({
  name: 'SUMBIM',
  description: '프론트엔드 개발자.',
  posts: 245,
  followers: 189,
  following: 132
})
</script>

<style>
.profile-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f2f5;
  padding: 30px 20px;
  border-radius: 10px;
  width: 300px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 10%;
}

.profile-info {
  text-align: left;
}

.profile-name {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
}

.profile-description {
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 2rem;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 18px;
  font-weight: bold;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #777;
}

.profile-actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.follow-button,
.message-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.follow-button {
  background-color: #f44336;
  color: white;
}

.message-button {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
}
</style>
