<template>
  <div v-if="!passwordConfirmed" class="container">
    <label for="비밀번호를 입력하세요" class="password">비밀번호</label>
    <div class="input-group">
      <input v-model="password" @input="updatePassword" id="password" name="password" type="password" required placeholder="비밀번호 입력" />
    </div>
    <button id="submit" active @click="check" type="submit" class="submit-btn">비밀번호 확인</button>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, computed, inject, defineModel } from 'vue'
import { useRouter } from 'vue-router'
import { checkPassword } from '@/api/user-api'
import { useAuthStore } from '@/stores/auth'
import { exitUser } from '@/api/user-api'
const activeTab = defineModel()
const authStore = useAuthStore()
const userId = computed(() => authStore.userId)
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
const router = useRouter()
const user = props.user
const password = ref('')
const passwordConfirmed = ref(false)
// 비밀번호 변경 전 체크
const check = async () => {
  await checkPassword(
    password.value,
    (result) => {
      passwordConfirmed.value = true
      password.value = ''
      let yes = confirm('탈퇴하시겠습니까?')
      if (yes) {
        deleteUserInfo()
      }
    },
    (error) => {
      showToast()
      console.log(error)
    }
  )
}

const deleteUserInfo = () => {
  exitUser(
    (result) => console.log(result),
    (error) => console.log(error)
  )

  // 로컬 정보 삭제
  authStore.logout()

  // 소셜 로그인 삭제
  if (authStore.socialType == 'NAVER') {
    deleteSocialLogin('naver')
  } else if (authStore.socialType == 'KAKAO') {
    deleteSocialLogin('kakao')
  } else if (authStore.socialType == 'GOOGLE') {
    deleteSocialLogin('google')
  }

  // 메인으로 이동
  router.push('/')
}

const deleteSocialLogin = (provider) => {
  const redirectUri = encodeURIComponent('http://192.168.120.75:3000&mode=unlink')
  window.location.href = `http://192.168.120.75:8080/oauth2/authorization/${provider}?redirect_uri=${redirectUri}`
}

const Swal = inject('$swal')
const showToast = () => {
  Swal.fire({
    text: '비밀번호가 틀렸습니다!',
    icon: 'error',
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      container: 'custom-swal'
    }
  })
}

watch(
  () => props.user,
  (newUser) => {
    user.value = newUser
  },
  { immediate: true }
)

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault() // 기본 동작(폼 제출) 방지
      document.getElementById('submit').click() // 현재 활성화된 요소(버튼) 클릭
    }
  })
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  gap: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  min-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 50px;
  height: 627px;
}

.label {
  font-weight: bold;
  color: #0c081e;
  text-align: center;
  width: 100%;
}

.description {
  font-size: 14px;
  color: #777;
  text-align: center;
  width: 100%;
}

.input-group {
  width: 100%;
  text-align: center;
  justify-content: center;
  display: flex;
}

.input-group input {
  width: 50%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
  box-sizing: border-box;
}

.submit-btn {
  width: 50%;
  background-color: #af8f6f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.submit-btn.active {
  background-color: #af8f6f;
}

.submit-btn.inactive {
  background-color: #555;
}

.submit-btn:hover:not(:disabled) {
  background-color: #74512d;
}
</style>

<style>
.swal2-container {
  top: 8% !important;
  width: 20% !important;
}

.swal2-toast {
  background-color: rgb(47, 52, 56) !important;
  width: 100%;
  color: white;
  display: flex !important;
  align-items: center !important;
  height: 50px;
  font-size: 0.9rem;
}
</style>
