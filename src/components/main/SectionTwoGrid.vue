<template>
  <div class="memory-grid">
    <SectionTwoCard
      v-for="(collection, index) in collections"
      :key="index"
      :image="collection.collectionItems[0].imagePath[0]"
      :title="collection.title"
      :description="collection.description"
    />
  </div>
</template>

<script setup>
import SectionTwoCard from './SectionTwoCard.vue'

const props = defineProps({
  collections: {
    type: Array,
    required: true
  }
})
console.log(props.collections)
</script>

<style scoped>
.memory-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 100px;
}
</style>
