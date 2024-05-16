<template>
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
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<style scoped>
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
</style>
