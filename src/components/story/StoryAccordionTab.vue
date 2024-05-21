<template>
  <div class="accordion-tab">
    <div class="tab-header" @click="toggle">
      {{ title }}
    </div>
    <div class="tab-content" v-if="isOpen">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.accordion-tab {
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.tab-header {
  background: #f7f7f7;
  padding: 10px;
  cursor: pointer;
}
.tab-content {
  padding: 10px;
  background: #fff;
}
</style>
