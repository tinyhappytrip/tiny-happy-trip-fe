<template>
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
</template>

<script setup></script>

<style scoped>
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
