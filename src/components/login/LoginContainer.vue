<template>
  <div class="container">
    <div class="login-box">
      <LoginLogoBox />
      <LoginForm />
      <LoginSocialBox />
    </div>
  </div>
</template>

<script setup>
import LoginForm from './LoginForm.vue'
import LoginLogoBox from './LoginLogoBox.vue'
import LoginSocialBox from './LoginSocialBox.vue'
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
  max-width: 400px;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
