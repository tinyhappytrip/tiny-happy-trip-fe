<template>
  <div class="container">
    <div class="login-box">
      <div class="logo-box">
        <div class="logo">
          <RouterLink to="/" class="go-to-link">
            <img src="@/assets/main/logo.png" alt="Logo" class="logo-image" />
            <div>소확행</div>
          </RouterLink>
        </div>
      </div>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="input-group">
          <input v-model="email" id="email" name="email" type="text" required placeholder="이메일" />
        </div>
        <div class="input-group">
          <input v-model="password" id="password" name="password" type="password" required placeholder="비밀번호" />
        </div>
        <button type="submit" class="login-button">로그인</button>
        <div class="links">
          <RouterLink to="/find" class="link">비밀번호 찾기</RouterLink> &nbsp;&nbsp;|&nbsp;&nbsp;
          <RouterLink to="/signup" class="link">회원가입</RouterLink>
        </div>
      </form>
      <div class="social-login">
        <div class="separator">
          <span class="separator-text">간편 로그인 / 회원가입</span>
        </div>
        <div class="social-icons">
          <div class="social-icon">
            <img src="@/assets/login/google.png" alt="Google" class="icon" />
          </div>
          <div class="social-icon">
            <img src="@/assets/login/kakao.png" alt="Kakao" class="icon" />
          </div>
          <div class="social-icon">
            <img src="@/assets/login/naver.webp" alt="Naver" class="icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  // Handle the form submission
  console.log('Email:', email.value)
  console.log('Password:', password.value)
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

.login-box {
  width: 100%;
  max-width: 450px;
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
  width: 64px;
  height: 64px;
  margin-bottom: 0.5rem;
}

.go-to-link {
  font-weight: bold;
  color: #333333;
  text-decoration: none;
  font-size: 2rem;
}

.login-form {
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 2rem;
}

.input-group input {
  width: 100%;
  padding: 14px 16px;
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

.login-button {
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

.login-button:hover {
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

.social-login {
  margin-top: 3rem;
}

.separator {
  position: relative;
  margin-bottom: 1rem;
}

.separator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #d1d5db;
  transform: translateY(-50%);
}

.separator-text {
  position: relative;
  padding: 0 1rem;
  background-color: #ffffff;
  color: #666666;
}

.social-icons {
  display: flex;
  justify-content: space-evenly;
}

.social-icon {
  width: 60px;
  height: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
}

.social-icon img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.social-icon:hover {
  background-color: #f3f4f6;
}
</style>
