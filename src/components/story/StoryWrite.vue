<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content card" :class="{ expanded: isExpanded }">
      <div class="title">
        <div>
          <button class="delete-btn" v-if="story.imageFiles.length !== 0 && !isExpanded" @click="deleteCurrentImage">삭제</button>
          <button class="delete-btn" v-if="isExpanded" @click="expandContent">이전</button>
        </div>
        <h1>새 이야기</h1>
        <button class="next-button" v-if="!isExpanded" @click="expandContent">다음</button>
        <button class="write-button" v-if="isExpanded" @click="uploadStory">작성</button>
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
import { ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import StoryImageUploader from '@/components/story/StoryImageUploader.vue'
import StoryForm from './StoryForm.vue'
import { watch, inject } from 'vue'
import { writeStory } from '@/api/story'

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
  console.log(story.value)
  writeStory(
    toRaw(story.value),
    (result) => {
      console.log(result.data)
      router.push('/story')
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
    document.documentElement.style.overflowY = newValue ? 'hidden' : 'auto'
  }
)

const Swal = inject('$swal')
const showToast = () => {
  Swal.fire({
    text: '이미지를 추가해주세요!',
    icon: 'error',
    toast: true,
    showConfirmButton: false,
    timer: 2000,
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
}

.write-button:hover,
.next-button:hover {
  font-weight: bold;
}

.delete-btn {
  padding: 20px;
  position: absolute;
}

.delete-btn:hover {
  font-weight: bold;
}
</style>

<style>
.swal2-container {
  top: 8% !important;
  width: 20% !important;
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
