<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="input-group">
      <input ref="emailInput" v-model="email" id="email" name="email" type="text" required placeholder="이메일" @input="validateEmail" />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>
    </div>
    <div class="input-group">
      <input ref="passwordInput" v-model="password" id="password" name="password" type="password" required placeholder="비밀번호" @input="validatePassword" />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
    </div>
    <button type="submit" class="login-button" :class="{ disabled: !isFormValid }" @click="handleClick">로그인</button>
    <div class="links">
      <RouterLink to="/find" class="link">비밀번호 찾기</RouterLink> &nbsp;&nbsp;|&nbsp;&nbsp;
      <RouterLink to="/signup" class="link">회원가입</RouterLink>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { login } from '@/api/user-api'
import { inject } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import router from '@/router'
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
// const router = useRouter()
const emailError = ref('')
const passwordError = ref('')

const emailInput = ref(null)
const passwordInput = ref(null)

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    emailError.value = '유효한 이메일을 입력하세요.'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  if (password.value.length < 8) {
    passwordError.value = '비밀번호는 최소 8자 이상이어야 합니다.'
  } else {
    passwordError.value = ''
  }
}

const isFormValid = computed(() => {
  return emailError.value === '' && passwordError.value === '' && email.value !== '' && password.value !== ''
})

const handleSubmit = async () => {
  validateEmail()
  validatePassword()
  if (!isFormValid.value) {
    return
  }
  const data = {
    email: email.value,
    password: password.value
  }

  await login(data).then((response) => {
    if (response.data) {
      authStore.login(response.data)
      router.replace('/')
    } else {
      showToast()
      email.value = ''
      password.value = ''
      nextTick(() => emailInput.value.focus())
    }
  })
}

const handleClick = (event) => {
  if (!isFormValid.value) {
    event.preventDefault()
    event.stopPropagation()
    if (emailError.value) {
      nextTick(() => emailInput.value.focus())
    } else if (passwordError.value) {
      nextTick(() => passwordInput.value.focus())
    }
  }
}

const Swal = inject('$swal')

const showAlert = () => {
  Swal.fire({
    title: '로그인 실패.',
    text: '회원 정보가 일치하지 않습니다.',
    icon: 'error',
    confirmButtonText: '확인',
    scrollbarPadding: false,
    willOpen: () => {
      const scrollY = document.documentElement.style.getPropertyValue('--scroll-y')
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}`
      document.body.style.width = '100%'
    },
    willClose: () => {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  })
}

const showToast = () => {
  Swal.fire({
    text: '회원 정보가 일치하지 않습니다.',
    icon: 'error',
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      container: 'custom-swal'
    }
  })
}

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
})

onMounted(() => {
  nextTick(() => emailInput.value.focus())
})
</script>

<style scoped>
.login-form {
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 2rem;
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 11px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #333333;
}

.input-group input:focus {
  outline: none;
  border-color: #333333;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  position: absolute;
  top: 100%;
  left: 0;
}

.login-button {
  width: 100%;
  padding: 14px 16px;
  background-color: #af8f6f;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #74512d;
}

.login-button.disabled {
  background-color: #d1d5db;
  cursor: default;
}

.login-button:hover:not(.disabled) {
  background-color: black;
}

.links {
  display: flex;
  justify-content: end;
  font-size: 0.8rem;
  color: #333333;
}

.links .link {
  text-decoration: none;
  color: #333333;
}

.links .link:hover {
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
