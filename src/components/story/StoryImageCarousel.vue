<template>
  <v-carousel height="500" show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="(image, i) in images" :key="i">
      <!-- <img :src="computedImagePath(image)"> -->
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'
const { images } = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const computedImagePath = (img) => {
  return 'file:/' + img
}
const colors = ref(['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'])
const slides = ref(['First', 'Second', 'Third', 'Fourth'])
console.log(images.length)
</script>

<style scope></style>
