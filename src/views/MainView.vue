<template>
  <v-app>
    <!-- <v-container fluid> -->
    <Header class="header" :isModalVisible="isModalVisible" @update:modalVisible="isModalVisible = $event" />
    <div ref="container" class="scroll-container"></div>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h1>Welcome to My Vue App</h1>
            <v-tabs centered>
              <v-tab>Home</v-tab>
              <v-tab>About</v-tab>
              <v-tab>Contact</v-tab>
            </v-tabs>
            <v-divider class="my-4"></v-divider>
            <v-card>
              <v-card-title>Main Content Area</v-card-title>
              <v-card-text>
                <p>This is the main content of the page.</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
  <Modal :visible="isModalVisible" @update:visible="isModalVisible = $event" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue'
import Header from '@/components/common/Header.vue'
import SectionOne from '@/components/main/SectionOne.vue'
import SectionTwo from '@/components/main/SectionTwo.vue'
import SectionThree from '@/components/main/SectionThree.vue'

const sections = ref([markRaw(SectionOne), markRaw(SectionTwo), markRaw(SectionThree)])
const currentSection = ref(0)
const isScrolling = ref(false)
const container = ref(null)
const isModalVisible = ref(false)
</script>

<style scoped>
.v-container {
  padding-top: 200px;
}
h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.v-container {
  padding: 0;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
}

.scroll-container {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  padding-top: 64px;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
}

.section {
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
  flex-shrink: 0;
}
</style>
