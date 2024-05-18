<template>
  <div class="container">
    <ProfileInfoBox :userId="route.params.userId" class="left-box" />
    <ProfileContentBox :userId="route.params.userId" class="right-box" />
  </div>
</template>

<script setup>
import ProfileInfoBox from '@/components/profile/ProfileInfoBox.vue'
import ProfileContentBox from '@/components/profile/ProfileContentBox.vue'
import { useRoute } from 'vue-router'
import {onMounted, ref} from 'vue'
const route = useRoute();

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
