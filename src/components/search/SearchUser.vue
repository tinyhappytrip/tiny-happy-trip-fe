<template>
  <div class="container">
    <ul class="follow-list">
      <li v-for="user in users" :key="user.userId" class="follow-item">
        <img :src="imagePath(user.userImage)" @click="navigateToProfile(user.userId)" />
        <div class="info">
          <h2>{{ user.nickname }}</h2>
          <p>{{ user.introduction }}</p>
        </div>
        <button class="follow-button" @click="createChatRoom(user.userId)">메세지</button>
        <button class="follow-button" @click="toggleFollow(user)">
          {{ user.isFollowing ? '취소' : '팔로우' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { followUser, unFollowUser, userListBySearchKeyword } from '@/api/user-api'
import { imagePath } from '@/util/http-commons'
import { useAuthStore } from '@/stores/auth'
import { getChatRoomId } from '@/api/chat-api'

const router = useRouter()
const authStore = useAuthStore()
const currentUserId = computed(() => authStore.userId)
const props = defineProps({
  searchKeyword: {
    type: String,
    required: true
  }
})
const users = ref([])
const emit = defineEmits(['setSearchCount', 'closeModal'])

const toggleFollow = async (user) => {
  try {
    if (user.isFollowing) {
      await unFollowUser(user.userId)
      user.isFollowing = false
    } else {
      await followUser(user.userId)
      user.isFollowing = true
    }
  } catch (error) {
    console.error(error)
  }
}

const createChatRoom = (user1) => {
  getChatRoomId(
    user1,
    (success) => {
      console.log(success.data)
      // router.push(`/messenger/${success.data}`)
      window.location.href = `/messenger/${success.data}`
      emit('closeModal') // Emit the event to close the modal
    },
    (error) => {
      console.log(error)
    }
  )
}

const fetchUsers = (keyword) => {
  userListBySearchKeyword(
    keyword,
    (result) => {
      console.log(result)
      users.value = result.data
        .filter((user) => user.userId !== currentUserId.value)
        .map((user) => ({
          userId: user.userId,
          nickname: user.nickname,
          userImage: user.userImage,
          introduction: user.introduction,
          isFollowing: user.following
        }))
      emit('setSearchCount', users.value.length)
    },
    (error) => {
      console.error(error)
    }
  )
}

const navigateToProfile = (userId) => {
  // 모달 닫기 로직을 추가해야 하는 곳
  // 예를 들어, 모달 상태를 관리하는 변수를 사용하여 모달을 닫습니다.
  // modalVisible.value = false;
  window.location.href = `/profile/${userId}`
  // router.replace(`/profile/${userId}`)
}

onMounted(() => {
  fetchUsers(props.searchKeyword)
})

defineExpose({
  searchByKeyword: fetchUsers
})
</script>
