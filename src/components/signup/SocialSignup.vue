<template>
  <div class="container">
    <div class="signup-container">
      <div class="header">
        <div class="title">환영합니다.</div>
        <p class="info">소확행에서 당신의 이야기를 써보세요.</p>
      </div>
      <form @submit.prevent="handleSubmit" class="signup-form">
        <label for="nickname" class="label">닉네임</label>
        <div class="description">소확행에서 사용할 닉네임입니다.(3자 ~ 10자)</div>
        <div class="input-group">
          <input :value="nickname" id="nickname" name="nickname" type="text" required placeholder="닉네임" @input="updateNickname" />
          <div class="error-message">{{ nicknameError }}</div>
        </div>
        <button type="submit" class="signup-btn" :disabled="!isFormValid">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Cookies from 'js-cookie'
import { socialSignup, getValidate } from '@/api/user-api'
import { useRouter } from 'vue-router'
const nickname = ref('')
const nicknameError = ref('')
const params = new URLSearchParams(window.location.search)
const router = useRouter()

if (params.get('email')) {
  Cookies.set('email', params.get('email'))
  Cookies.set('socialType', params.get('socialType'))
  Cookies.set('userImage', params.get('userImage'))
  router.replace({ path: '/signup?social=true' })
}

const isFormValid = computed(() => {
  return nickname.value && !nicknameError.value
})

const validateNickname = async () => {
  const hangulConsonants = /^[ㄱ-ㅎ]$/
  const hangulVowels = /^[ㅏ-ㅣ]$/
  const invalidHangulPattern = /([ㄱ-ㅎㅏ-ㅣ])$/
  const containsWhitespace = /\s/g

  if (containsWhitespace.test(nickname.value)) {
    nicknameError.value = '닉네임에는 공백을 포함할 수 없습니다.'
    return false
  } else if (hangulConsonants.test(nickname.value) || hangulVowels.test(nickname.value)) {
    nicknameError.value = '올바른 닉네임을 입력해주세요.'
    return false
  } else if (invalidHangulPattern.test(nickname.value)) {
    nicknameError.value = '올바른 닉네임을 입력해주세요.'
    return false
  } else if (nickname.value.length < 3 || nickname.value.length > 10) {
    nicknameError.value = '닉네임은 3자 이상 10자 이하이어야 합니다.'
    return false
  } else {
    await getValidate('nickname', nickname.value).then((response) => {
      if (response.data) {
        nicknameError.value = '이미 사용중인 닉네임입니다.'
      } else {
        nicknameError.value = ''
      }
    })
  }
}

const updateNickname = (event) => {
  nickname.value = event.target.value.trim()
  validateNickname()
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  const data = {
    email: Cookies.get('email'),
    nickname: nickname.value,
    socialType: Cookies.get('socialType'),
    userImage: Cookies.get('userImage')
  }
  await socialSignup(data).then(() => {
    Cookies.remove('email')
    Cookies.remove('socialType')
    Cookies.remove('userImage')
    router.replace('/')
  })
}

// Watchers for real-time validation
watch(nickname, validateNickname)
</script>

<style scoped>
.container {
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  padding-bottom: 200px;
}

.signup-container {
  width: 100%;
  max-width: 400px;
  padding: 1.5rem 2.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header {
  margin-bottom: 40px;
}

.title {
  font-size: 1.6rem;
  font-weight: 700;
  cursor: default;
  color: #333333;
  margin-bottom: 10px;
}

.header p {
  font-size: 0.8rem;
}

.label {
  display: block;
  text-align: left;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.description {
  text-align: left;
  font-size: 0.7rem;
  opacity: 0.5;
  margin-bottom: 0.3rem;
  cursor: default;
}

.form-group {
  margin-bottom: 1.5rem;
}

.email-input-group {
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
}

.email-input-group input {
  width: 50%;
  padding: 11px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
}

.select-wrapper {
  width: 50%;
  position: relative;
}

.select-wrapper select {
  width: 100%;
  padding: 11px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
  line-height: 1.5;
}

.caret-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.email-input-group input:focus,
.select-wrapper select:focus {
  outline: none;
  border-color: #333333;
}

.send-btn {
  width: 100%;
  padding: 14px 16px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group input {
  width: 100%;
  padding: 11px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
}

.input-group input:focus {
  outline: none;
  border-color: #333333;
  box-sizing: border-box;
}

.signup-btn {
  width: 100%;
  padding: 14px 16px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1rem;
}

.signup-btn:hover {
  background-color: black;
}

.error-message {
  color: red;
  font-size: 0.6rem;
  text-align: left;
  line-height: 1.5;
  position: absolute;
}
</style>
