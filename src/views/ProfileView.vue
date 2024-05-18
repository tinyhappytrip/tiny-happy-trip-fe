<template>
  <div class="container">
    <ProfileInfoBox class="left-box" />
    <ProfileContentBox class="right-box" />
  </div>
</template>

<script setup>
import ProfileInfoBox from '@/components/profile/ProfileInfoBox.vue'
import ProfileContentBox from '@/components/profile/ProfileContentBox.vue'
</script>

<style scoped>
.container {
  width: 60%;
  margin: 0 auto;
  margin-top: 70px;
}

.left-box {
  float: left;
}
.right-box {
  float: right;
  width: 65%;
}
</style>
