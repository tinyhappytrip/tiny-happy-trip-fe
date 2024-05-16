<template>
  <div>
    <h2>Login</h2>
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" label="Password" type="password"></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const email = ref('')
    const password = ref('')

    const login = () => {
      // 로그인 로직 작성
    }

    return { email, password, login }
  }
})
</script>
