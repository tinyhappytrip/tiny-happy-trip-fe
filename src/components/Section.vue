<template>
  <div class="section-content">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Section',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.section-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  border: 1px solid #ccc;
  background-color: #f2f2f2;
}
</style>
