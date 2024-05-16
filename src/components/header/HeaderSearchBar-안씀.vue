<template>
  <div class="search-bar">
    <input type="text" v-model="query" placeholder="검색어를 입력하세요..." />
    <button @click="search">
      <img src="@/assets/main/search.png" alt="Search" class="search-icon" />
    </button>
  </div>
</template>

<script setup></script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 25%;
}

.search-bar input {
  flex: 1;
  padding: 0.5em;
  font-size: 1em;
}

.search-bar button {
  background: none;
  border: none;
  padding: 0.5em;
  cursor: pointer;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.search-bar button:hover .search-icon {
  filter: brightness(0.8);
}
</style>
