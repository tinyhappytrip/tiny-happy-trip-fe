<template>
  <v-dialog :model-value="visible" fullscreen hide-overlay transition="" @update:model-value="updateVisible">
    <v-card>
      <v-toolbar flat>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Search</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['update:visible'])

const updateVisible = (value) => {
  emit('update:visible', value)
}

const close = () => {
  emit('update:visible', false)
}
</script>

<style scoped></style>
