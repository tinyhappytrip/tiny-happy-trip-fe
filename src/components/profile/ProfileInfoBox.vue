<template>
  <div class="profile-container">
    <div class="profile-header">
      <img class="profile-picture" :src="imagePath(profile.userImage)" />
      <div class="profile-info"></div>
    </div>
    <h2 class="profile-name">{{ profile.nickname }}</h2>
    <p class="profile-description">{{ profile.description }}</p>
    <div class="profile-stats">
      <div class="stat">
        <span class="stat-number">{{ postCount }}</span>
        <span class="stat-label">게시물</span>
      </div>
      <div class="stat">
        <span class="stat-number">{{ profile.followerCount }}</span>
        <span class="stat-label">팔로워</span>
      </div>
      <div class="stat">
        <span class="stat-number">{{ profile.followingCount }}</span>
        <span class="stat-label">팔로잉</span>
      </div>
    </div>
    <div v-if="!isCurrentUser" class="profile-actions">
      <button @click="clickFollowBtn" class="follow-button">{{ isFollowing ? '팔로우 취소' : '팔로우' }}</button>
      <button class="message-button">메시지</button>
    </div>
    <div v-else class="profile-actions">
      <button @click="goToMyPage" class="follow-button">프로필변경</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from 'vue'
import { getUserInfo, followUser, unFollowUser, followList } from '@/api/user-api'
import { userStory } from '@/api/story-api'
import { userCollection } from '@/api/collection-api'
import { useAuthStore } from '@/stores/auth'
import { imagePath } from '@/util/http-commons'
import { useRouter, useRoute } from 'vue-router'
const authStore = useAuthStore()
authStore.checkAuth()
const isLoggedIn = computed(() => authStore.isLoggedIn)
const loginUserId = computed(() => authStore.userId)
const isUser = ref(false)
const profile = ref({})
const isFollowing = ref(false)
const postCount = ref(0)
const userFollowerList = ref([])
const router = useRouter()
const route = useRoute()

const clickFollowBtn = () => {
  if (isFollowing.value) {
    unFollow()
  } else {
    follow()
  }
}

const unFollow = () => {
  unFollowUser(
    route.params.userId,
    (result) => {
      isFollowing.value = false
      userInfo()
    },
    (error) => {
      console.log(error)
    }
  )
}

const follow = () => {
  followUser(
    route.params.userId,
    (result) => {
      isFollowing.value = true
      userInfo()
    },
    (error) => {
      console.log(error)
    }
  )
}
const userInfo = () => {
  getUserInfo(
    route.params.userId,
    (result) => {
      profile.value = result.data
    },
    (error) => {
      console.log(error)
    }
  )
}

const isCurrentUser = computed(() => {
  console.log(loginUserId.value)
  console.log(route.params.userId)
  return loginUserId.value === route.params.userId
})
const checkIsFollowing = () => {
  followList(
    route.params.userId,
    (result) => {
      userFollowerList.value = result.data
      for (let i = 0; i < userFollowerList.value.length; i++) {
        if (userFollowerList.value[i].route.params.userId == loginUserId.value) {
          isFollowing.value = true
          break
        }
      }
    },
    (error) => {
      console.log(error)
    }
  )
}

const goToMyPage = () => {
  router.push('/mypage/' + loginUserId)
}
// 초기 작업
onMounted(() => {
  userInfo()
  checkIsFollowing()
  isUser.value = loginUserId === route.params.userId
  console.log(isUser.value)
  console.log(route.params.userId)

  userStory(
    route.params.userId,
    (result) => {
      postCount.value += result.data.length
    },
    (error) => console.log(error)
  )

  userCollection(
    route.params.userId,
    (result) => {
      postCount.value += result.data.length
    },
    (error) => console.log(error)
  )
})
</script>

<style scoped>
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
  background-color: #af8f6f;
  color: white;
}

.message-button {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
}
</style>
