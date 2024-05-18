<template>
  <v-container>
    <v-tabs v-model="tab" grow>
      <v-tab>My Story</v-tab>
      <v-tab>Collections</v-tab>
      <v-tab>Likes</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div>My Story content goes here...</div>
      </v-tab-item>
      <v-tab-item>
        <div>Collections content goes here...</div>
      </v-tab-item>
      <v-tab-item>
        <div>Likes content goes here...</div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      nickname: 'Your Nickname',
      description: 'A brief description about yourself.'
    }
  }
}
</script>

<style>
/* Optional: Add custom styles here */
</style>
