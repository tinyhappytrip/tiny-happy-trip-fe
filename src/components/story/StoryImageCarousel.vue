<template>
  <v-carousel v-model="currentSlide" height="100%" show-arrows="hover" :cycle="false" hide-delimiters>
    <template v-slot:next>
      <font-awesome-icon
        v-if="currentSlide !== props.images.length - 1"
        :icon="['fas', 'arrow-right']"
        class="custom-arrow next-arrow"
        @click.stop="goToNext"
      />
    </template>
    <template v-slot:prev>
      <font-awesome-icon v-if="currentSlide !== 0" :icon="['fas', 'arrow-right']" rotation="180" class="custom-arrow prev-arrow" @click.stop="goToPrev" />
    </template>
    <v-carousel-item v-for="(image, i) in images" :key="i">
      <img :style="{ cursor: isList ? 'pointer' : 'default' }" width="100%" height="100%" :src="imagePath(image)" />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from 'vue'
import { imagePath } from '@/util/http-commons'
const props = defineProps({
  isList: {},
  images: {
    type: Array,
    required: true
  }
})

const currentSlide = ref(0)

const goToPrev = () => {
  currentSlide.value = (currentSlide.value - 1 + props.images.length) % props.images.length
}

const goToNext = () => {
  currentSlide.value = (currentSlide.value + 1) % props.images.length
}
</script>

<style scoped>
.custom-arrow {
  width: 24px;
  height: 24px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  position: absolute;
  top: 50%;
}

.v-carousel:hover .custom-arrow {
  opacity: 1;
}

.next-arrow {
  right: 30px;
}

.prev-arrow {
  left: 30px;
}
</style>
