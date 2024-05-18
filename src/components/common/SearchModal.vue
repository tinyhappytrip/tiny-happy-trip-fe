<template>
  <transition name="fade">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('update:visible', false)">
      <div class="modal">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2400;

  border-radius: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  top: 0;
  left: 0;

  color-scheme: normal;
  --v-theme-background: 255, 255, 255;
  --v-theme-background-overlay-multiplier: 1;
  --v-theme-surface: 255, 255, 255;
  --v-theme-surface-overlay-multiplier: 1;
  --v-theme-surface-bright: 255, 255, 255;
  --v-theme-surface-bright-overlay-multiplier: 1;
  --v-theme-surface-light: 238, 238, 238;
  --v-theme-surface-light-overlay-multiplier: 1;
  --v-theme-surface-variant: 66, 66, 66;
  --v-theme-surface-variant-overlay-multiplier: 2;
  --v-theme-on-surface-variant: 238, 238, 238;
  --v-theme-primary: 24, 103, 192;
  --v-theme-primary-overlay-multiplier: 2;
  --v-theme-primary-darken-1: 31, 85, 146;
  --v-theme-primary-darken-1-overlay-multiplier: 2;
  --v-theme-secondary: 72, 169, 166;
  --v-theme-secondary-overlay-multiplier: 1;
  --v-theme-secondary-darken-1: 1, 135, 134;
  --v-theme-secondary-darken-1-overlay-multiplier: 1;
  --v-theme-error: 176, 0, 32;
  --v-theme-error-overlay-multiplier: 2;
  --v-theme-info: 33, 150, 243;
  --v-theme-info-overlay-multiplier: 1;
  --v-theme-success: 76, 175, 80;
  --v-theme-success-overlay-multiplier: 1;
  --v-theme-warning: 251, 140, 0;
  --v-theme-warning-overlay-multiplier: 1;
  --v-theme-on-background: 0, 0, 0;
  --v-theme-on-surface: 0, 0, 0;
  --v-theme-on-surface-bright: 0, 0, 0;
  --v-theme-on-surface-light: 0, 0, 0;
  --v-theme-on-primary: 255, 255, 255;
  --v-theme-on-primary-darken-1: 255, 255, 255;
  --v-theme-on-secondary: 255, 255, 255;
  --v-theme-on-secondary-darken-1: 255, 255, 255;
  --v-theme-on-error: 255, 255, 255;
  --v-theme-on-info: 255, 255, 255;
  --v-theme-on-success: 255, 255, 255;
  --v-theme-on-warning: 255, 255, 255;
  --v-border-color: 0, 0, 0;
  --v-border-opacity: 0.12;
  --v-high-emphasis-opacity: 0.87;
  --v-medium-emphasis-opacity: 0.6;
  --v-disabled-opacity: 0.38;
  --v-idle-opacity: 0.04;
  --v-hover-opacity: 0.04;
  --v-focus-opacity: 0.12;
  --v-selected-opacity: 0.08;
  --v-activated-opacity: 0.12;
  --v-pressed-opacity: 0.12;
  --v-dragged-opacity: 0.08;
  --v-theme-kbd: 33, 37, 41;
  --v-theme-on-kbd: 255, 255, 255;
  --v-theme-code: 245, 245, 245;
  --v-theme-on-code: 0, 0, 0;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
