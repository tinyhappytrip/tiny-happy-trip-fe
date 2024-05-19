<template>
  <div class="container">
    <div class="signup-container">
      <div class="logo-box">
        <div class="logo">
          <RouterLink to="/" class="go-to-link">
            <img src="@/assets/main/logo.png" alt="Logo" class="logo-image" />
          </RouterLink>
          <div class="title">회원가입</div>
        </div>
      </div>
      <form @submit.prevent="handleSubmit" class="signup-form">
        <div class="form-group">
          <label for="email" class="label">이메일</label>
          <div class="email-input-group">
            <input type="text" id="email" v-model="email" :readonly="verificationCodeVerified" placeholder="이메일" required @input="validateEmail" />
            <div style="margin: 0 5px">@</div>
            <div class="select-wrapper">
              <template v-if="emailDomain !== 'custom'">
                <select v-model="emailDomain" :disabled="verificationCodeVerified" required @change="validateEmail">
                  <option value="" disabled>선택해주세요</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="custom">직접입력</option>
                </select>
                <font-awesome-icon :icon="['fas', 'caret-down']" size="xl" class="caret-icon" />
              </template>
              <template v-else>
                <input
                  type="text"
                  v-model="customEmailDomain"
                  :readonly="verificationCodeVerified"
                  placeholder="도메인"
                  required
                  class="custom-domain-input"
                  @input="validateEmail"
                />
                <button type="button" class="cancel-btn" @click="resetEmailDomain">X</button>
              </template>
            </div>
            <span class="error-message">{{ emailError }}</span>
          </div>
          <div v-if="isVerificationSent" class="verification-container">
            <input
              type="text"
              v-model="verificationCode"
              placeholder="인증코드 6자리"
              class="verification-code-input"
              maxlength="6"
              :readonly="verificationCodeVerified"
            />
            <span class="timer">{{ formattedTime }}</span>
            <button v-if="!verificationCodeVerified" type="button" class="verify-btn" @click="checkVerificationCode" :disabled="verificationCodeVerified">
              인증
            </button>
            <button v-if="verificationCodeVerified" type="button" class="verify-btn" :disabled="verificationCodeVerified">확인</button>
            <span class="error-message">{{ verificationError }}</span>
          </div>
          <button v-else class="send-btn" type="button" @click="verifyEmail" :disabled="!isEmailComplete">인증하기</button>
        </div>
        <label for="password" class="label">비밀번호</label>
        <div class="description">영문, 숫자를 포함하여 비밀번호를 입력해주세요. (8자 이상)</div>
        <div class="input-group">
          <input v-model="password" id="password" name="password" type="password" required placeholder="비밀번호" @input="validatePassword" />
          <div class="error-message">{{ passwordError }}</div>
        </div>
        <label for="passwordCheck" class="label">비밀번호 확인</label>
        <div class="description">위와 똑같은 비밀번호를 입력해주세요.</div>
        <div class="input-group">
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
        <label for="nickname" class="label">닉네임</label>
        <div class="description">소확행에서 사용할 닉네임입니다.(3자 ~ 10자)</div>
        <div class="input-group">
          <input :value="nickname" @input="updateNickname" id="nickname" name="nickname" type="text" required placeholder="닉네임" />
          <div class="error-message">{{ nicknameError }}</div>
        </div>
        <button type="submit" class="signup-btn" :disabled="!isFormValid">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { signup, getValidate } from '@/api/user-api'
import { useRouter } from 'vue-router'
import { sendCode, sendPassword } from '@/api/mail-api'

const message = ref('')
const email = ref('')
const emailDomain = ref('')
const customEmailDomain = ref('')
const password = ref('')
const passwordCheck = ref('')
const nickname = ref('')
const emailError = ref('')
const passwordError = ref('')
const passwordCheckError = ref('')
const nicknameError = ref('')
const emailVerified = ref(false)
const isVerificationSent = ref(false)
const verificationCode = ref('')
const correctVerificationCode = ref('')
const verificationCodeVerified = ref(false)
const verificationError = ref('')
const timer = ref(180)
const interval = ref(null)
const router = useRouter()

const isEmailComplete = computed(() => {
  if (emailDomain.value === 'custom') {
    return email.value && customEmailDomain.value
  }
  return email.value && emailDomain.value
})

const isFormValid = computed(() => {
  return (
    isEmailComplete &&
    verificationCodeVerified.value &&
    password.value &&
    passwordCheck.value &&
    nickname.value &&
    !passwordError.value &&
    !passwordCheckError.value &&
    !nicknameError.value &&
    !emailError.value
  )
})

const validateEmail = () => {
  const domain = emailDomain.value === 'custom' ? customEmailDomain.value : emailDomain.value
  const fullEmail = `${email.value}@${domain}`
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(fullEmail)) {
    emailError.value = '유효한 이메일을 입력해주세요.'
    return false
  }
  emailError.value = ''
  return true
}

const validatePassword = () => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (!passwordPattern.test(password.value)) {
    passwordError.value = '비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.'
    return false
  }
  passwordError.value = ''
  return true
}

const validatePasswordCheck = () => {
  if (password.value !== passwordCheck.value) {
    passwordCheckError.value = '비밀번호가 일치하지 않습니다.'
    return false
  }
  passwordCheckError.value = ''
  return true
}

const validateNickname = () => {
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
  }

  nicknameError.value = ''
  return true
}

const updateNickname = (event) => {
  nickname.value = event.target.value.trim()
  validateNickname()
}

const verifyEmail = async () => {
  if (validateEmail()) {
    const domain = emailDomain.value === 'custom' ? customEmailDomain.value : emailDomain.value
    console.log(`Verify email: ${email.value}@${domain}`)
    const emailData = `${email.value}@${domain}`
    await getValidate(emailData).then(async (response) => {
      console.log(response)
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
        emailError.value = '이미 가입된 회원입니다.'
        email.value = ''
      } else {
        isVerificationSent.value = true
        startTimer()
        await sendCode(emailData).then((response) => {
          correctVerificationCode.value = response.data.toString().trim()
        })
      }
    })
  }
}

const checkVerificationCode = () => {
  if (verificationCode.value.trim() === correctVerificationCode.value.trim()) {
    verificationCodeVerified.value = true
    verificationError.value = ''
    clearInterval(interval.value) // Stop the timer
  } else {
    verificationError.value = '인증코드가 일치하지 않습니다.'
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    signup(
      {
        email: `${email.value}@${emailDomain.value === 'custom' ? customEmailDomain.value : emailDomain.value}`,
        password: password.value,
        nickname: nickname.value
      },
      (result) => {
        console.log(result)
        router.push('login')
        message.value = ''
      }
    )
  }
}

const resetEmailDomain = () => {
  emailDomain.value = ''
  customEmailDomain.value = ''
  emailVerified.value = false
}

// Watchers for real-time validation
watch(email, validateEmail)
watch(emailDomain, validateEmail)
watch(customEmailDomain, validateEmail)
watch(password, validatePassword)
watch(passwordCheck, validatePasswordCheck)
watch(nickname, validateNickname)

// Timer functionality
const startTimer = () => {
  timer.value = 180
  if (interval.value) clearInterval(interval.value)
  interval.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(interval.value)
    }
  }, 1000)
}

const formattedTime = computed(() => {
  const minutes = Math.floor(timer.value / 60)
  const seconds = timer.value % 60
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
}

.signup-container {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.logo-image {
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
}

.go-to-link {
  font-weight: bold;
  color: #333333;
  text-decoration: none;
  font-size: 2rem;
}

.title {
  font-size: 1.7rem;
  font-weight: 700;
  cursor: default;
  color: #333333;
}

.signup-form {
  margin-bottom: 1rem;
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
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
}

.email-input-group input {
  font-size: 0.8rem;
  width: 50%;
  padding: 11px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
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
  font-size: 0.8rem;
  color: #333333;
  line-height: 1.5;
}

.custom-domain-input {
  width: 100% !important;
}

.caret-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.email-input-group input:focus,
.select-wrapper select:focus,
.custom-domain-input:focus {
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
  transition: background-color 0.3s;
}

.send-btn:disabled {
  background-color: #d1d5db;
  cursor: default;
}

.input-group {
  position: relative;
  margin-bottom: 1.5rem;
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

.signup-btn:disabled {
  background-color: #d1d5db;
  cursor: default;
}

.error-message {
  color: red;
  font-size: 0.6rem;
  text-align: left;
  position: absolute;
  line-height: 1.5;
  top: 45px;
}

.cancel-btn {
  background: none;
  border: none;
  font-size: 1rem;
  color: #333333;
  cursor: pointer;
  padding: 0 10px;
  align-self: center;
  position: absolute;
  right: 0;
  line-height: 1.5;
  top: 25%;
}

.verification-container {
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
}

.verification-code-input {
  width: 60%;
  padding: 11px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #333333;
  margin-right: 5px;
}

.timer {
  font-size: 0.8rem;
  font-weight: bold;
  color: #333333;
  margin-right: 10px;
}

.verify-btn {
  padding: 14px 16px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.verify-btn:disabled {
  background-color: #d1d5db;
  cursor: default;
}
select:disabled,
input:read-only {
  background-color: #d1d5db;
}
</style>
