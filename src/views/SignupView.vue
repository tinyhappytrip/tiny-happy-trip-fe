<template>
  <div>
    <h2>Signup</h2>
    <v-form @submit.prevent="signup">
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" label="Password" type="password"></v-text-field>
      <v-btn type="submit" color="primary">Signup</v-btn>
    </v-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SignupPage',
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')

    const signup = () => {
      // 회원가입 로직 작성
    }

    return { name, email, password, signup }
  }
})
</script>
