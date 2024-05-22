<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <font-awesome-icon :icon="['fas', 'xmark']" size="2xl" class="close-button" @click.stop="close" />
    <div class="modal-content card" :class="{ expanded: isExpanded }">
      <div class="title">
        <div>
          <font-awesome-icon :icon="['fas', 'arrow-right']" rotation="180" class="previous-btn" v-if="isExpanded" @click="expandContent" />
          <font-awesome-icon
            :icon="['fas', 'trash-arrow-up']"
            class="delete-btn"
            v-if="story.imageFiles.length !== 0 && !isExpanded"
            @click="deleteCurrentImage"
          />
        </div>
        <h1>새 이야기</h1>
        <font-awesome-icon class="next-button" :icon="['fas', 'arrow-right']" v-if="!isExpanded" @click="expandContent" />
        <button class="write-button" v-if="isExpanded" @click="uploadStory">완료</button>
      </div>
      <div class="content">
        <div class="left-content" :class="{ expanded: !isExpanded }">
          <StoryImageUploader v-model:story="story" ref="imageUploader"></StoryImageUploader>
        </div>
        <div class="right-content" v-show="isExpanded">
          <StoryForm :story="story"></StoryForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { writeStory } from '@/api/story-api'
import { ref, watch, toRaw, inject } from 'vue'
import { useRouter } from 'vue-router'
import StoryImageUploader from '@/components/story/StoryImageUploader.vue'
import StoryForm from './StoryForm.vue'

const props = defineProps({
  isVisible: Boolean
})

const emit = defineEmits(['update:isVisible'])

const initialStoryState = {
  imageFiles: []
}

const story = ref({ ...initialStoryState })

const isExpanded = ref(false)

const router = useRouter()

const uploadStory = () => {
  writeStory(
    toRaw(story.value),
    (result) => {
      window.location.href = '/story'
      close()
    },
    (error) => {
      console.log(error)
    }
  )
}

const close = () => {
  emit('update:isVisible', false)
  resetStory()
}

const expandContent = () => {
  if (isExpanded.value) {
    isExpanded.value = false
  } else {
    if (story.value.imageFiles.length === 0) {
      showToast()
      return
    }
    isExpanded.value = true
  }
}

const deleteCurrentImage = () => {
  const imageUploader = document.querySelector('.modal-content').__vueParentComponent.refs.imageUploader
  if (imageUploader) {
    imageUploader.deleteImage(imageUploader.currentIndex)
  }
}

const resetStory = () => {
  story.value = { ...initialStoryState }
  isExpanded.value = false
}

watch(
  () => props.isVisible,
  (newValue) => {
    document.documentElement.style.overflow = newValue ? 'hidden' : 'auto'
  }
)

const Swal = inject('$swal')
const showToast = () => {
  Swal.fire({
    text: '이미지를 추가해주세요!',
    icon: 'error',
    toast: true,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      container: 'custom-swal'
    }
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
}

.modal-content {
  position: relative;
  background: white;
  max-width: 90%;
  transition: all 0.2s ease-in-out;
}

.card {
  width: 660px;
  height: 800px;
}

.card.expanded {
  width: 1100px;
  height: 800px;
}

.title {
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: flex;
  position: absolute;
}

.title > h1 {
  text-align: center;
  padding: 20px 0;
  width: 100%;
}

.content {
  display: flex;
  height: 100%;
}

.left-content {
  width: 60%;
  padding-top: 56px;
}

.left-content.expanded {
  width: 100%;
}

.right-content {
  width: 40%;
}

.write-button,
.next-button {
  position: absolute;
  padding: 20px;
  right: 0;
  cursor: pointer;
}

.write-button:hover,
.next-button:hover {
  font-weight: bold;
}

.delete-btn {
  padding: 20px;
  position: absolute;
  right: 30px;
  cursor: pointer;
}

.close-button {
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 25px;
  z-index: 9999;
  width: 50px;
  height: 50px;
}

.previous-btn {
  position: absolute;
  cursor: pointer;
  padding: 20px;
}
</style>

<style>
.swal2-container {
  top: 8% !important;
  width: 20% !important;
  z-index: 9999;
}

.swal2-toast {
  background-color: rgb(47, 52, 56) !important;
  width: 100%;
  color: white;
  display: flex !important;
  align-items: center !important;
  height: 50px;
  font-size: 0.9rem;
}
</style>
