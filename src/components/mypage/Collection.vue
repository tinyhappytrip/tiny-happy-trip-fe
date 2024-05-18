<template>
  <v-container>
    <v-row>
      <v-col v-for="(photo, index) in photos" :key="index" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="photo.url" height="200px"></v-img>
          <v-card-title>{{ photo.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      photos: [
        { url: 'http://loc alhost:3000/src/assets/main/poorin.png', title: 'Photo 1' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 2' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 3' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 4' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 5' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 6' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 1' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 2' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 3' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 4' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 5' },
        { url: 'http://localhost:3000/src/assets/main/poorin.png', title: 'Photo 6' }
      ]
    }
  }
}
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
}
</style>
