<template>
  <div>
    <StoryDetail 
    v-if="showModal && story" 
    :story="story" 
    :storyId="storyId"
    @close="closeModal"
    />
    <div class="v-container v-locale--is-ltr">
      <div class="v-row justify-end">
        <!--좌측-->
        <div class="v-col-md-7 left">
          <div class="v-sheet" style="min-height: 70vh">
            <div v-if="storyIsEmpty">
              <p>스토리가 없습니다.</p>
              <v-btn @click="moveStoryWrite">
                <v-icon icon="mdi-plus"></v-icon>
                스토리 작성
              </v-btn>
            </div>
            <div v-else>
              <StoryCard v-for="story in stories" :key="story.storyId" :story="story" @move-detail="handleMoveDetail(story.storyId)"> </StoryCard>
            </div>
          </div>
        </div>

        <!--우측-->
        <div class="v-col-md-4 right">
          <div class="v-sheet" style="min-height: 268px">
            <v-col>
              <div class="card">
                <div class="alert">
                  <div class="alert_header">
                    <span>알림 </span>
                    <span><img src="@/assets/bell.png" width="25px" /></span>
                  </div>
                  <hr />

                  <div class="alert_element" v-for="alert in alerts">
                    <div class="profile">
                      <img class="profile_img" :src="alert.img" />
                      <p>{{ alert.nickname }}</p>
                    </div>
                    <span class="alert_content">{{ alert.content }}</span>
                    <hr />
                  </div>
                </div>
              </div>
            </v-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { listStory, detailStory } from '@/api/story'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StoryCard from '@/components/story/StoryCard.vue'
import StoryDetail from './StoryDetail.vue'
import { useModalStore } from '@/stores/modal'

const router = useRouter()
const stories = ref([])
const showModal = ref(false)
const story = ref({})
const storyId = ref(0)
const modalStore = useModalStore()
const alerts = ref([
  {
    nickname: 'soom',
    img: '@/assets/main/poorin.png',
    content: 'hi'
  },
  {
    nickname: 'ss1',
    img: '@/assets/main/poorin.png',
    content: 'hello'
  },
  {
    nickname: 'ss3',
    img: '@/assets/main/poorin.png',
    content: 'bye'
  }
])

const getStoryList = () => {
  listStory(
    (result) => {
      stories.value = result.data
      console.log(stories.value)
    },
    (error) => {
      console.log(error)
    }
  )
}

const handleMoveDetail = async (detailStoryId) => {
  storyId.value = detailStoryId
  await getStoryDetail(detailStoryId)
  showModal.value = true
  modalStore.setModal(showModal.value)
}

const moveStoryWrite = () => {
  router.push('story/write')
}

const storyIsEmpty = computed(() => {
  return stories.value.length == 0
})

const closeModal = () => {
  showModal.value = false
  getStoryList()
}

getStoryList()

const getStoryDetail = async (storyId) => {
  console.log(storyId)

  await detailStory(
    storyId,
    (result) => {
      story.value = result.data
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>

<style scoped>
.left {
  widows: 800px;
}
.v-container {
  width: 1000px;
}

.card {
  padding: 5px 20px;
  background: none;
  box-shadow: 0 0 0 transparent; /* 또는 'initial'로 설정 */
  background: white;
  border-radius: 5px;
}

.card > * {
  padding: 10px 0;
}

.buttons > * {
  margin: 0 5px;
}

.profile {
  text-align: center;
  align-items: center;
}
.profile_img {
  width: 50px; /* 이미지 크기 조정 */
  height: 50px;
  border-radius: 50%; /* 원형 모양으로 */
}

.alert_header {
  padding: 10px;
  align-items: center;
  display: flex;
  justify-items: center;
}

.alert_header > img {
  padding: 10px;
}
.alert_element {
  display: flex;
  margin: 10px;
}

.alert_content {
  text-align: center;
  margin: 10px;
}

.left {
  width: 650px;
}

.right {
  width: 200px;
  margin-left: 60px;
}
</style>
