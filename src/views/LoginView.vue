<template>
  <div style="text-align: center">
    <h1>임시용입니다.</h1>
    <a href="http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000&mode=unlink">
      <button>Google Unlink</button>
    </a>
    <a href="http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000&mode=unlink">
      <button>Naver Unlink</button>
    </a>
    <a href="http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000&mode=unlink">
      <button>Kakao Unlink</button>
    </a>
  </div>
  <LoginContainer />
</template>

<script setup>
import LoginContainer from '@/components/login/LoginContainer.vue'
</script>
<style scoped></style>
