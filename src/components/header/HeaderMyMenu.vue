<template>
  <div class="my">
    <div class="image-box">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="2xl" class="icon" />
    </div>
    <div class="image-box">
      <RouterLink to="/story/write">
      <font-awesome-icon :icon="['far', 'square-plus']" size="2xl" class="icon" />
        </RouterLink>
    </div>
    <div class="image-box">
      <font-awesome-icon :icon="['far', 'paper-plane']" size="2xl" class="icon" />
    </div>
    <div class="image-box">
      <RouterLink to="/login">
        <font-awesome-icon :icon="['fas', 'right-to-bracket']" size="2xl" class="icon" />
      </RouterLink>
    </div>
    <div class="my-image-box" style="display: none">
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
  text-decoration: none;
  color: black;
}
.my {
  width: 17%;
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
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
