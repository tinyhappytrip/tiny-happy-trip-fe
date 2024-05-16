<template>
  <v-app-bar app>
    <v-toolbar-title>My App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/login">Login</v-btn>
    <v-btn text to="/register">Register</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header'
}
</script>
