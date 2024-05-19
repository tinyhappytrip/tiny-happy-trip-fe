<template>
  <div>
    <v-app v-if="isSocial" style="padding-top: 80px">
      <Header :isModalVisible="isModalVisible" @update:modalVisible="isModalVisible = $event" />
      <v-main style="--v-layout-bottom: 0px">
        <SocialSignupView />
      </v-main>
      <Footer />
    </v-app>
    <Modal :visible="isModalVisible" @update:visible="isModalVisible = $event" />
    <div v-if="!isSocial">
      <Signup />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SocialSignupView from '@/components/signup/SocialSignup.vue'
import Signup from '@/components/signup/Signup.vue'
const isModalVisible = ref(false)

const params = new URLSearchParams(window.location.search)
const isSocial = ref(params.get('social') !== null)
</script>

<style scoped></style>
