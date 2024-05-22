<template>
  <v-app>
    <!-- <v-container fluid> -->
    <Header class="header" :isModalVisible="isModalVisible" @update:modalVisible="isModalVisible = $event" />
    <div ref="container" class="scroll-container">
      <section v-for="(section, index) in sections" :key="index" class="section">
        <component :is="section" />
      </section>
    </div>
    <!-- </v-container> -->
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

const handleScroll = (event) => {
  if (isModalVisible.value) return // Prevent scrolling when modal is visible
  event.preventDefault()
  if (isScrolling.value) return
  isScrolling.value = true

  const delta = event.deltaY
  if (delta > 0) {
    nextSection()
  } else if (delta < 0) {
    previousSection()
  }

  setTimeout(() => {
    isScrolling.value = false
  }, 700)
}

const nextSection = () => {
  if (currentSection.value < sections.value.length - 1) {
    currentSection.value++
    scrollToSection()
  } else {
    isScrolling.value = false
  }
}

const previousSection = () => {
  if (currentSection.value > 0) {
    currentSection.value--
    scrollToSection()
  } else {
    isScrolling.value = false
  }
}

const scrollToSection = () => {
  const section = container.value.children[currentSection.value]
  section.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('wheel', handleScroll, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleScroll)
})
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: auto;
  height: 100%;
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

<!-- <template>
  <v-app>
    <Header class="header" :isModalVisible="isModalVisible" @update:modalVisible="isModalVisible = $event" />
    <div ref="container" class="scroll-container">
      <section v-for="(section, index) in sections" :key="index" class="section">
        <component :is="section" @next-section="nextSection" />
      </section>
    </div>
    <Modal :visible="isModalVisible" @update:visible="isModalVisible = $event" />
    <NavigationDots :sections="sections" :currentSection="currentSection" @update:currentSection="scrollToSection" />
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue'
import Header from '@/components/common/Header.vue'
import SectionOne from '@/components/main/SectionOne.vue'
import SectionTwo from '@/components/main/SectionTwo.vue'
import SectionThree from '@/components/main/SectionThree.vue'
import Modal from '@/components/common/Modal.vue'
import NavigationDots from '@/components/common/NavigationDots.vue'

const sections = ref([markRaw(SectionOne), markRaw(SectionTwo), markRaw(SectionThree)])
const currentSection = ref(0)
const isScrolling = ref(false)
const container = ref(null)
const isModalVisible = ref(false)

const handleScroll = (event) => {
  if (isModalVisible.value) return
  event.preventDefault()
  if (isScrolling.value) return
  isScrolling.value = true

  const delta = event.deltaY
  if (delta > 0) {
    nextSection()
  } else if (delta < 0) {
    previousSection()
  }

  setTimeout(() => {
    isScrolling.value = false
  }, 700)
}

const nextSection = () => {
  if (currentSection.value < sections.value.length - 1) {
    currentSection.value++
    scrollToSection(currentSection.value)
  } else {
    isScrolling.value = false
  }
}

const previousSection = () => {
  if (currentSection.value > 0) {
    currentSection.value--
    scrollToSection(currentSection.value)
  } else {
    isScrolling.value = false
  }
}

const scrollToSection = (index) => {
  currentSection.value = index
  const section = container.value.children[currentSection.value]
  section.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('wheel', handleScroll, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleScroll)
})
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: auto;
  height: 100%;
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
</style> -->

<!-- <template>
  <v-app>
    <Header class="header" :isModalVisible="isModalVisible" @update:modalVisible="isModalVisible = $event" />
    <div ref="container" class="scroll-container">
      <section v-for="(section, index) in sections" :key="index" class="section">
        <component :is="section" @next-section="nextSection" />
      </section>
    </div>
    <Modal :visible="isModalVisible" @update:visible="isModalVisible = $event" />
    <NavigationDots :sections="sections" :currentSection="currentSection" @update:currentSection="scrollToSection" />
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue'
import Header from '@/components/common/Header.vue'
import SectionOne from '@/components/main/SectionOne.vue'
import SectionTwo from '@/components/main/SectionTwo.vue'
import SectionThree from '@/components/main/SectionThree.vue'
import Modal from '@/components/common/Modal.vue'
import NavigationDots from '@/components/common/NavigationDots.vue'

const sections = ref([markRaw(SectionOne), markRaw(SectionTwo), markRaw(SectionThree)])
const currentSection = ref(0)
const isScrolling = ref(false)
const container = ref(null)
const isModalVisible = ref(false)

const handleScroll = (event) => {
  if (isModalVisible.value) return
  event.preventDefault()
  if (isScrolling.value) return
  isScrolling.value = true

  const delta = event.deltaY
  if (delta > 0) {
    nextSection()
  } else if (delta < 0) {
    previousSection()
  }

  setTimeout(() => {
    isScrolling.value = false
  }, 700)
}

const nextSection = () => {
  if (currentSection.value < sections.value.length - 1) {
    currentSection.value++
    scrollToSection(currentSection.value)
  } else {
    isScrolling.value = false
  }
}

const previousSection = () => {
  if (currentSection.value > 0) {
    currentSection.value--
    scrollToSection(currentSection.value)
  } else {
    isScrolling.value = false
  }
}

const scrollToSection = (index) => {
  currentSection.value = index
  const section = container.value.children[currentSection.value]
  section.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('wheel', handleScroll, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleScroll)
})
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: auto;
  height: 100%;
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
</style> -->
