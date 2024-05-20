<template>
  <nav class="nav">
    <ul>
      <li><RouterLink to="/story">이야기</RouterLink></li>
      <li><a href="/collection">모음집</a></li>
      <li><a href="#">추천여행지</a></li>
      <li><a href="#">여행계획</a></li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
.nav {
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100%;
}
.nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav ul li {
  margin: 20px;
  font-size: 1.2rem;
  font-weight: 500;
}
.nav ul li a {
  color: black;
  text-decoration: none;
}
</style>
