<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <font-awesome-icon :icon="['fas', 'xmark']" size="2xl" class="close-button" @click.stop="closeModal" />
    <div class="modal-content modal" :class="{ expanded: isExpanded }">
      <div class="title">
        <div>
          <font-awesome-icon :icon="['fas', 'arrow-right']" rotation="180" class="previous-btn" v-if="isExpanded" @click="expandContent" />
        </div>
        <h1 v-if="!isExpanded">이야기 선택 ({{ selectedStories.length }} / 6)</h1>
        <h1 v-if="isExpanded">모음집 설정</h1>
        <font-awesome-icon class="next-button" :icon="['fas', 'arrow-right']" v-if="!isExpanded" @click="expandContent" />
        <button class="write-button" v-if="isExpanded" @click="write">완료</button>
      </div>
      <div v-if="!isExpanded" class="image-box">
        <div class="message" v-if="!selectedStories.length">이야기를 선택하세요.(4개 ~ 6개)</div>
        <div v-for="(story, index) in selectedStories" :key="story.storyId" class="story-card" :class="{ 'last-card': index === selectedStories.length - 1 }">
          <img :src="computedImagePath(story.images[0])" class="story-image" />
          <div style="text-align: center">{{ index + 1 }}</div>
        </div>
      </div>

      <div class="content">
        <div v-if="!isExpanded" class="left-content" :class="{ expanded: !isExpanded }">
          <CollectionSelect @send-selected-stories="updateSelectedStories" />
        </div>
        <div class="right-content" v-show="isExpanded">
          <div class="input-group">
            <label for="title" class="comment_title">제목</label>
            <input id="title" v-model="collection.title" />
          </div>
          <div class="input-group">
            <label for="description" class="comment_title">설명</label>
            <input id="description" v-model="collection.description" />
          </div>
          <div class="input-group">
            <label for="musicKeyword" class="comment_title">MUSIC</label>
            <input id="musicKeyword" v-model="collection.musicKeyword" placeholder="음악 키워드" />
          </div>
          <div class="toggle">
            <div class="comment_title">공개 범위 설정</div>
            <div class="toggle-group">
              <input type="radio" id="public" name="visibility" v-model="collection.scope" value="PUBLIC" />
              <label for="public" class="toggle-option">공개</label>
              <input type="radio" id="followers-only" name="visibility" v-model="collection.scope" value="FOLLOWER" />
              <label for="followers-only" class="toggle-option">팔로워 </label>
              <input type="radio" id="private" name="visibility" v-model="collection.scope" value="PRIVATE" />
              <label for="private" class="toggle-option">비공개</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { useRouter } from 'vue-router'
import { writeCollection } from '@/api/collection-api'
import CollectionSelect from '@/components/collection/CollectionSelect.vue'
import { imagePath } from '@/util/http-commons'

const props = defineProps({
  isVisible: Boolean
})
const emit = defineEmits(['update:isVisible', 'sendSelectedStories'])
const router = useRouter()
const isExpanded = ref(false)
const collection = ref({
  title: '',
  description: '',
  scope: '',
  collectionItems: [],
  musicKeyword: ''
})

const expandContent = () => {
  if (selectedStories.value.length < 4) {
    showToast()
    return
  }
  isExpanded.value = !isExpanded.value
}

const Swal = inject('$swal')

const showToast = () => {
  Swal.fire({
    text: '4개 이상 선택해주세요.',
    icon: 'error',
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      container: 'custom-swal'
    }
  })
}
const selectedStories = ref([])

const updateSelectedStories = (stories) => {
  selectedStories.value = stories
  collection.value.collectionItems = stories.map((story) => story.storyId)
}

const computedImagePath = (img) => {
  return imagePath(img)
}

const write = () => {
  writeCollection(
    collection.value,
    () => {
      emit('update:isVisible', false)
      router.push('/')
    },
    (error) => {
      console.error(error)
    }
  )
}

const closeModal = () => {
  emit('update:isVisible', false)
  resetModalContent()
}

const resetModalContent = () => {
  collection.value = {
    title: '',
    description: '',
    scope: '',
    collectionItems: [],
    musicKeyword: ''
  }
  selectedStories.value = []
  isExpanded.value = false
}

watch(
  () => props.isVisible,
  (newValue) => {
    document.documentElement.style.overflow = newValue ? 'hidden' : 'auto'
  }
)
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

.modal {
  width: 660px;
  height: 800px;
}

.modal.expanded {
  width: 440px;
  height: 600px;
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

.delete-btn {
  padding: 20px;
  position: absolute;
  right: 30px;
  cursor: pointer;
}

.image-box {
  display: flex;
  flex-wrap: wrap;
  height: 120px;
  padding: 20px;
  margin-top: 56px;
  justify-content: flex-start;
  position: relative;
}

.image-box .message {
  font-size: 1.2rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.story-card {
  border-radius: 5px;
  overflow: hidden;
  width: 90px;
  height: 110px;
  position: relative;
  margin-right: 15px;
}

.story-card.last-card {
  margin-right: 0;
}

.story-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
}

.content {
  display: flex;
  height: 100%;
}

.left-content {
  width: 60%;
}

.left-content.expanded {
  width: 100%;
}

.right-content {
  width: 100%;
  height: 600px;
  padding: 56px 30px 20px 30px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 20px;
}

.input-group label {
  font-weight: bold;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
}

.toggle {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 10px;
}

.toggle-group {
  display: flex;
  width: 80%;
  justify-content: space-between;
}

.toggle-group input[type='radio'] {
  background-color: #333333;
  color: #fff;
  border-color: #333333;
  width: 25%;
  text-align: center;
  display: none;
}

.toggle-option {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  width: 30%;
  text-align: center;
}

.toggle-option:hover {
  background-color: #f0f0f0;
}

.toggle-group input[type='radio']:checked + .toggle-option {
  background-color: #333333;
  color: #fff;
  border-color: #333333;
}

.write-button,
.next-button {
  position: absolute;
  padding: 20px;
  right: 0;
  cursor: pointer;
}
.write-button:hover {
  background-color: #d32f2f;
}

.comment_title {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  cursor: default;
}
</style>
