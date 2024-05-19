<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-img :src="item.image" height="200px"></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.subtitle }}</v-card-subtitle>
          <v-card-text>{{ item.description }}</v-card-text>
          <v-card-actions>
            <v-btn text @click="viewItem(item)">View</v-btn>
            <v-btn text @click="deleteItem(index)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    viewItem(item) {
      // 아이템 보기 로직
      console.log('Viewing item:', item)
    },
    deleteItem(index) {
      // 아이템 삭제 로직
      this.$emit('delete-item', index)
    }
  }
}
</script>

<style scoped>
/* 스타일은 필요에 따라 추가 */
</style>
