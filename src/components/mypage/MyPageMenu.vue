<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="profile-info">
        <input type="file" id="profile-image" class="file-input" hidden @change="handleFileChange" ref="fileInput" />
        <div class="profile-card" @click="clickImageEdit">
          <img :src="imagePath(user.userImage)" class="profile-image" />
          <div class="profile-title">편집</div>
        </div>
        <h1>{{ user.nickname }}</h1>
        <p>{{ user.description ? user.description : 'hello' }}</p>
        <div class="stats">
          <span>{{ user.followerCount }} 팔로워</span>
          <span>|</span>
          <span>{{ user.followingCount }} 팔로잉</span>
        </div>
      </div>
      <nav class="profile-nav">
        <a href="#" @click.prevent="activeTab = 'editProfile'">프로필 설정</a>
        <hr />
        <a href="#" @click.prevent="activeTab = 'changePassword'">비밀번호 변경 </a>
        <hr />
        <a href="#" @click.prevent="activeTab = 'managePost'">게시물 관리 </a>
        <hr />
        <a href="#" @click.prevent="activeTab = 'manageLike'">내 책갈피 </a>
        <hr />
        <a href="#" @click.prevent="activeTab = 'quit'">회원탈퇴</a>
      </nav>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <ProfileEdit :user="user" v-if="activeTab === 'editProfile' && isUserLoaded" class="content-block"></ProfileEdit>
      <PasswordChange :user="user" v-model="activeTab" v-if="activeTab === 'changePassword'" class="content-block"></PasswordChange>
      <PostManage :user="user" v-if="activeTab === 'managePost'" class="content-block"></PostManage>
      <LikeManage :user="user" v-if="activeTab === 'manageLike'" class="content-block"></LikeManage>
      <UserQuit :user="user" v-model="activeTab" v-if="activeTab === 'quit'" class="content-block"></UserQuit>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getUserInfo, updateUserImage } from '@/api/user-api'
import { imagePath } from '@/util/http-commons'
import PasswordChange from '@/components/mypage/PasswordChange.vue'
import UserQuit from '@/components/mypage/UserQuit.vue'
import router from '@/router'
const user = ref({})
const isUserLoaded = ref(false)
const activeTab = ref('editProfile')
const fileInput = ref(null)
const imageFile = ref()

const userInfo = (userId) => {
  getUserInfo(
    userId,
    (result) => {
      user.value = {
        email: result.data.email,
        socialType: result.data.socialType,
        id: result.data.userId,
        nickname: result.data.nickname,
        userImage: result.data.userImage,
        description: result.data.introduction,
        followerCount: result.data.followerCount,
        followingCount: result.data.followingCount
      }
      isUserLoaded.value = true
    },
    (error) => {
      console.log(error)
    }
  )
}

const clickImageEdit = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    imageFile.value = file
    changeUserImage()
  } else {
    console.log('이미지 읽기 실패')
  }
}

const changeUserImage = () => {
  updateUserImage(
    imageFile.value,
    (result) => {
      userInfo(user.value.id)
      router.replace(window.location.pathname)
    },
    (error) => {
      console.log(error)
    }
  )
}

onMounted(() => {
  const authStore = useAuthStore()
  const userId = computed(() => authStore.userId)
  userInfo(userId.value)
  activeTab.value = 'editProfile'
})
</script>

<style scoped>
body {
  background-color: #f0f2f5;
}

.profile-page {
  margin: 100px auto;
  display: flex;
  gap: 20px;
  padding: 0 20px;
  max-width: 1200px;
}

.profile-header {
  width: 300px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
}

.profile-info {
  text-align: center;
  padding: 10px;
  margin: 10px;
}

.profile-info > * {
  margin: 10px 0;
}
.profile-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  background: #fff;
  transition: all 0.3s ease-in-out;
  width: 100%;
  height: 100%;
}

.profile-image {
  height: auto;
  transition: filter 0.3s ease-in-out;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.profile-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 1.2rem;
  font-weight: 400;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
}

.profile-card:hover .profile-image {
  filter: blur(3px);
}

.profile-card:hover .profile-title {
  color: white;
  opacity: 1;
}

.profile-image:hover {
  filter: blur(3px);
  cursor: pointer;
}

.profile-info h1 {
  color: #0c081e;
  font-size: 24px;
  margin-bottom: 5px;
}

.profile-info p {
  color: #777;
  margin-bottom: 10px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  color: #0c081e;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.content {
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
}

.profile-nav {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.profile-nav a {
  display: block;
  margin: 30px 20px;
  font-size: 20px;
  text-decoration: none;
  color: #0c081e;
  cursor: pointer;
}

.content-section {
  margin-top: 20px;
}

.content-block {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
}

.content-block h2 {
  color: #0c081e;
}

.content-item {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.content-item:last-child {
  border-bottom: none;
}

.content-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.content-info {
  flex: 1;
}

.content-info h3 {
  margin: 0 0 5px;
  color: #0c081e;
}

.content-info p {
  margin: 0;
  color: #777;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

button:hover {
  background-color: darken(#f44336, 10%);
}
</style>
