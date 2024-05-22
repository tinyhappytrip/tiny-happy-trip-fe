<!-- NavigationDots.vue -->
<template>
  <div class="navigation-dots">
    <div v-for="(section, index) in sections" :key="index" :class="{ dot: true, active: index === currentSection }" @click="scrollToSection(index)"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  sections: Array,
  currentSection: Number
})

const emit = defineEmits(['update:currentSection'])

const scrollToSection = (index) => {
  emit('update:currentSection', index)
}
</script>

<style scoped>
.navigation-dots {
  position: fixed;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
}

.dot.active {
  background-color: #000;
}
</style>
