<template>
  <div v-if="!passwordConfirmed" class="container">
    <label for="비밀번호를 입력하세요" class="password">비밀번호</label>
    <div class="input-group">
      <input v-model="password" @input="updatePassword" id="password" name="password" type="password" required placeholder="비밀번호 입력" />
    </div>
    <button active @click="check" type="submit" class="submit-btn">비밀번호 확인</button>
  </div>

  <div v-else class="container">
    <label for="password" class="label">비밀번호</label>
    <div class="description">영문, 숫자를 포함하여 비밀번호를 입력해주세요. (8자 이상)</div>
    <div class="input-group-change-password">
      <input v-model="newPassword" id="password" name="newPassword" type="password" required placeholder="비밀번호" @input="validatePassword" />
      <div class="error-message">{{ passwordError }}</div>
    </div>
    <label for="passwordCheck" class="label">비밀번호 확인</label>
    <div class="description">위와 똑같은 비밀번호를 입력해주세요.</div>
    <div class="input-group-change-password">
      <input
        v-model="passwordCheck"
        id="passwordCheck"
        name="passwordCheck"
        type="password"
        required
        placeholder="비밀번호 확인"
        @input="validatePasswordCheck"
      />
      <div class="error-message">{{ passwordCheckError }}</div>
    </div>
    <button @click="changePassword" type="submit" class="submit-btn" :disabled="!isFormValid" :class="{ active: isFormValid, inactive: !isFormValid }">
      비밀번호 변경
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, computed, inject, defineModel } from 'vue'
import { useRouter } from 'vue-router'
import { updateUserPassword, checkPassword } from '@/api/user-api'
const activeTab = defineModel()
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
const newPassword = ref('')
const passwordCheck = ref('')
const passwordConfirmed = ref(false)
const passwordError = ref('')
const passwordCheckError = ref('')

// 비밀번호 변경 전 체크
const check = async () => {
  await checkPassword(
    password.value,
    (result) => {
      passwordConfirmed.value = true
      password.value = ''
    },
    (error) => {
      showToast()
      console.log(error)
    }
  )
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

const changePassword = () => {
  updateUserPassword(
    newPassword.value,
    (result) => {
      activeTab.value = 'editProfile'
    },
    (error) => {
      console.log(error)
    }
  )
}

const validatePassword = () => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (!passwordPattern.test(newPassword.value)) {
    passwordError.value = '비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.'
    return false
  }
  passwordError.value = ''
  return true
}

const validatePasswordCheck = () => {
  if (newPassword.value !== passwordCheck.value) {
    passwordCheckError.value = '비밀번호가 일치하지 않습니다.'
    return false
  }
  passwordCheckError.value = ''
  return true
}

const isFormValid = computed(() => {
  return newPassword.value && passwordCheck.value && !passwordError.value && !passwordCheckError.value
})

watch(
  () => props.user,
  (newUser) => {
    user.value = newUser
  },
  { immediate: true }
)

watch(newPassword, validatePassword)

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault() // 기본 동작(폼 제출) 방지
      document.activeElement.click() // 현재 활성화된 요소(버튼) 클릭
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
.input-group-change-password {
  width: 100%;
  text-align: center;
  justify-content: center;
  /* display: flex; */
  position: relative;
  padding-bottom: 15px;
}
.input-group-change-password input {
  width: 50%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
  box-sizing: border-box;
}
.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
}

.submit-btn {
  width: 50%;
  background-color: #f44336;
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
  background-color: #f44336;
}

.submit-btn.inactive {
  background-color: #555;
}

.submit-btn:hover:not(:disabled) {
  background-color: #d32f2f;
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
