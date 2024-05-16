<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    const layout = computed(() => {
      return route.meta.layout || 'div'
    })

    return { layout }
  }
}
</script>
