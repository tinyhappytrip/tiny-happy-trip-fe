<template>
  <div class="logo-box">
    <div class="logo">
      <RouterLink to="/" class="go-to-link">
        <img src="@/assets/main/logo.png" alt="Logo" class="logo-image" />
      </RouterLink>
      <div class="title">로그인</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
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

.title {
  font-size: 2rem;
  font-weight: bold;
  cursor: default;
  color: #333333;
}
</style>
