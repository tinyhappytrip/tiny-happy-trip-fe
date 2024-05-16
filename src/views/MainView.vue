<template>
  <div>
    <h1>Welcome to My Website</h1>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainView'
})
</script>

<style scoped>
h1 {
  font-size: 2100px;
}
</style>
