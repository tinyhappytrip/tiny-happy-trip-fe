<template>
  <div class="container">
    <div class="find-box">
      <div class="header-box">
        <div class="header">
          <div>비밀번호 찾기</div>
        </div>
      </div>
      <div class="info">가입한 이메일 주소를 입력해주세요.</div>
      <form @submit.prevent="handleSubmit" class="find-form">
        <div class="input-group">
          <input v-model="email" id="email" name="email" type="text" required placeholder="이메일" @input="checkEmail" />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
          <span v-if="emailSuccess" class="success-message">{{ emailSuccess }}</span>
        </div>
        <button :class="['submit-button', { 'submit-button--disabled': !isEmailValid }]" type="submit" :disabled="!isEmailValid">인증코드 전송</button>
      </form>
      <div class="login-link">
        <RouterLink to="/login">로그인하러가기</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sendPassword } from '@/api/mail-api'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const email = ref('')
const isEmailValid = ref(false)
const isSuccess = ref(false)
const emailSuccess = ref('')
const emailError = ref('')

const handleSubmit = async () => {
  if (isEmailValid.value) {
    await sendPassword(email.value).then((response) => {
      if (response.data === 'KAKAO') {
        emailError.value = '카카오 간편계정으로 가입된 회원입니다.'
        email.value = ''
      } else if (response.data === 'GOOGLE') {
        emailError.value = '구글 간편계정으로 가입된 회원입니다.'
        email.value = ''
      } else if (response.data === 'NAVER') {
        emailError.value = '네이버 간편계정으로 가입된 회원입니다.'
        email.value = ''
      } else if (response.data === 'EMAIL') {
        showToast()
      } else {
        emailError.value = '등록된 계정이 없습니다.'
        email.value = ''
      }
    })
  }
}

const checkEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isEmailValid.value = emailRegex.test(email.value)
  emailError.value = isEmailValid.value ? '' : '유효하지 않은 이메일 주소입니다.'
}

const Swal = inject('$swal')

const showToast = () => {
  Swal.fire({
    text: '비밀번호가 전송되었습니다.',
    icon: 'success',
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      container: 'custom-swal'
    }
  })
}

onMounted(() => {
  document.documentElement.style.overflow = 'auto'
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>

<style scoped>
.container {
  padding-top: 150px;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  padding-bottom: 200px;
}

.find-box {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header-box {
  margin-bottom: 2rem;
}

.header {
  font-size: 1.7rem;
  font-weight: 600;
}

.find-form {
  margin-bottom: 1rem;
}

.info {
  text-align: left;
  margin-bottom: 1rem;
  font-size: 0.8rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
}

.input-group input {
  width: 100%;
  padding: 11px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #333333;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  border-color: #333333;
}

.error-message {
  position: absolute;
  top: 50px;
  left: 0;
  font-size: 0.8rem;
  color: red;
}

.success-message {
  position: absolute;
  top: 50px;
  left: 0;
  font-size: 0.8rem;
  color: green;
}

.icon {
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: green;
}

.submit-button {
  width: 100%;
  padding: 14px 16px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: background-color 0.3s;
}

.submit-button--disabled {
  background-color: #d1d5db;
  cursor: default;
}

.submit-button:not(.submit-button--disabled):hover {
  background-color: black;
}

.login-link {
  font-size: 0.9rem;
  text-align: right;
}

.login-link a {
  color: #333333;
  text-decoration: none;
  font-size: 0.8rem;
}

.login-link a:hover {
  color: black;
  font-weight: bold;
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
