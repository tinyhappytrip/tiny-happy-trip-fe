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
            <input type="text" id="email" v-model="email" placeholder="이메일" required />
            <div style="margin: 0 5px">@</div>
            <div class="select-wrapper">
              <select v-model="emailDomain" required>
                <option value="" disabled>선택해주세요</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="custom">직접입력</option>
              </select>
              <font-awesome-icon :icon="['fas', 'caret-down']" size="xl" class="caret-icon" />
            </div>
          </div>
          <button class="send-btn" type="button" @click="verifyEmail">인증하기</button>
        </div>
        <label for="password" class="label">비밀번호</label>
        <div class="description">영문, 숫자를 포함하여 비밀번호를 입력해주세요. (8자 ~ 20자)</div>
        <div class="input-group">
          <input v-model="password" id="password" name="password" type="password" required placeholder="비밀번호" />
        </div>
        <label for="passwordCheck" class="label">비밀번호 확인</label>
        <div class="description">위와 똑같은 비밀번호를 입력해주세요.</div>
        <div class="input-group">
          <input v-model="passwordCheck" id="passwordCheck" name="passwordCheck" type="password" required placeholder="비밀번호 확인" />
        </div>
        <label for="nickname" class="label">닉네임</label>
        <div class="description">소확행에서 사용할 닉네임입니다.(2자 ~ 10자)</div>
        <div class="input-group">
          <input v-model="nickname" id="nickname" name="nickname" type="text" required placeholder="닉네임" />
        </div>
        <button type="submit" class="signup-btn">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const emailDomain = ref('')
const password = ref('')
const passwordCheck = ref('')
const nickname = ref('')
const params = new URLSearchParams(window.location.search)
const paramsObj = Object.fromEntries(params.entries())
const text = () => {
  console.log('클릭')
}

const verifyEmail = () => {
  const domain = emailDomain.value
  console.log(`Verify email: ${email.value}@${domain}`)
}

const handleSubmit = () => {
  if (password.value !== passwordCheck.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  const domain = emailDomain.value === 'custom' ? customEmailDomain.value : emailDomain.value

  console.log('Form submitted', {
    email: `${email.value}@${emailDomain.value}`,
    password: password.value,
    nickname: nickname.value
  })
}
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
</style>
