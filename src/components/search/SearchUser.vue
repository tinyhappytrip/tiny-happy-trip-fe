<template>
  <div class="container">
    <ul class="follow-list">
      <li v-for="user in users" :key="user.id" class="follow-item">
        <img :src="imagePath(user.userImage)" />
        <div class="info">
          <h2>{{ user.name }}</h2>
          <p>{{ user.nickname }}</p>
          <p>{{ user.description }}</p>
        </div>

        <button class="follow-button">{{ user.isFollowing ? '팔로우중' : '팔로우' }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { userListBySearchKeyword } from '@/api/user-api'
import { imagePath } from '@/util/http-commons'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const currentUserId = computed(() => authStore.userId)
const props = defineProps({
  searchKeyword: {
    type: String
  }
})
const searchKeyword = ref(props.searchKeyword)
const users = ref({})
const isFollowing = ref(false)
const emit = defineEmits(['setSearchCount'])
const items = ref([])
const searchByKeyword = (keyword) => {
  fetchUsers(keyword)
}
const fetchUsers = (keyword) => {
  userListBySearchKeyword(
    keyword,
    (result) => {
      users.value = []
      for (let i = 0; i < result.data.length; i++) {
        const user = result.data[i]

        // 현재 접속한 유저는 나타내지 않는다
        if (user.userId == currentUserId.value) continue
        users.value.push({
          userId: user.userId,
          nickname: user.nickname,
          userImage: user.userImage,
          introduction: user.introduction ? user.introduction : 'hi',
          isFollowing: user.isFollowing
        })
      }
      emit('setSearchCount', users.value.length)
    },
    (error) => console.log(error)
  )
}

onMounted(() => {
  fetchUsers(searchKeyword.value)
})

defineExpose({
  searchByKeyword
})
</script>

<style scoped>
.container {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
}

.follow-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.follow-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.follow-item:last-child {
  border-bottom: none;
}

.follow-item img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.follow-item .info {
  flex-grow: 1;
}

.follow-item h2 {
  margin: 0 0 5px;
  font-size: 18px;
  color: #333;
}

.follow-item p {
  margin: 0;
  color: #666;
}
</style>
