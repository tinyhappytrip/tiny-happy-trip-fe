<template>
  <div class="my">
    <div class="image-box">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="2xl" class="icon" />
    </div>
    <div class="image-box">
      <font-awesome-icon :icon="['far', 'square-plus']" size="2xl" class="icon" />
    </div>
    <div class="image-box">
      <font-awesome-icon :icon="['far', 'paper-plane']" size="2xl" class="icon" />
    </div>
    <div class="my-image-box">
      <img src="@/assets/main/poorin.png" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.my {
  width: 20%;
  display: flex;
  justify-content: space-between;
}

.image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

img {
  width: 35px;
  height: 35ppx;
}

.my-image-box img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
