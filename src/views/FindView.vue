<template>
  <div class="container">
    <div class="find-box">
      <div class="header-box">
        <div class="header">
          <div>비밀번호 재설정</div>
        </div>
      </div>
      <div class="info">가입한 이메일 주소를 입력해주세요.</div>
      <form @submit.prevent="handleSubmit" class="find-form">
        <div class="input-group">
          <input v-model="email" id="email" name="email" type="text" required placeholder="이메일" />
          <font-awesome-icon :icon="['far', 'circle-check']" size="xl" class="icon" />
        </div>
        <button type="submit" class="submit-button">인증코드 전송</button>
      </form>
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
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  padding-bottom: 200px;
}

.find-box {
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  font-size: 2rem;
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
  padding: 14px 16px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  border-color: #333333;
  box-sizing: border-box;
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
  margin-bottom: 1rem;
}

.submit-button:hover {
  background-color: black;
}
</style>
