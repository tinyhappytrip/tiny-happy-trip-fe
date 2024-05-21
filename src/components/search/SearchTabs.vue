<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" v-for="(item, index) in items" :key="index">
        <v-card>
          <v-img :src="item.image" class="white--text" height="200px">
            <v-container fill-height>
              <v-row align="end">
                <v-col>
                  <h3 class="headline">{{ item.title }}</h3>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
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
  }
}
</script>

<style scoped>
.headline {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
