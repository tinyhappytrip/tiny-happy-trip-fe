<template>
  <nav class="nav">
    <ul>
      <li><a href="#">이야기</a></li>
      <li><a href="#">모음집</a></li>
      <li><a href="#">추천여행지</a></li>
      <li><a href="#">여행계획</a></li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
.nav {
  font-weight: 700;
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
  margin-left: 30px;
  font-size: 1.3rem;
}
.nav ul li a {
  color: black;
  text-decoration: none;
}
</style>
