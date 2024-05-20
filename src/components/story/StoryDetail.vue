<template>
  <div class="modal-overlay" @click.stop="closeModal">
    <div class="card" ref="modalContent">
      <div class="content">
        <div class="left-content">
          <StoryImageCarousel :images="story.images" />
        </div>
        <div class="right-content">
          <div class="subcard">
            <div class="title">
              <img :src="`http://localhost:8080/image?path=${story.userImage}`" class="user-image" />
              <div class="user-info-box">
                <div>{{ story.nickname }}</div>
                <div style="color: #808080">{{ formattedDate }}</div>
              </div>
              <div class="image-box">
                <img width="30px" :src="computedWeather" />
              </div>
              <div class="image-box">
                <img width="30px" :src="computedEmotion" />
              </div>
            </div>
          </div>
          <div class="location-box">
            <img src="@/assets/main/location.png" width="20px" />
            <span>{{ story.location }}</span>
          </div>
          <div style="height: 200px; background: pink"></div>
          <div class="scroll-box">
            <div style="border-bottom: 0.5px solid #ddd; display: block; padding: 20px 0" v-html="formattedContent"></div>
            <div v-for="comment in story.storyComments" :key="comment.storyCommentId">
              <div class="comment" style="padding-top: 15px">
                <RouterLink :to="`/profile/${comment.userId}`">
                  <img :src="`http://localhost:8080/image?path=${story.userImage}`" width:="10px" style="margin-right: 5px;" class="comment-user-image"/>
                </RouterLink>
                <p style="font-size: 0.8rem; margin-right: 10px; line-height: 1.3">
                  <RouterLink :to="`/profile/${comment.userId}`">
                    {{ comment.nickname }}
                  </RouterLink>
                  &nbsp;&nbsp;
                  {{ comment.content }}
                </p>
              </div>
              <div>
                <span class="alert_content date">{{ computedDate(comment.createdAt) }}</span>
                <button style="font-size: 0.8rem; margin-left: 10px" @click.stop="reply(comment.nickname, comment.storyCommentId)">답글달기</button>
              </div>
              <div class="reply" v-for="reply in comment.replies" :key="reply.storyReplyId">
                <span><p>-></p></span>
                <div class="storyComment">
                  <img width="10px" class="storyComment_img" :src="reply.userImage ? reply.userImage : '/src/assets/main/user.png'" />
                  <p>{{ reply.nickname }}</p>
                </div>
                <span class="alert_content">{{ reply.content }}</span>
                <span class="alert_content date">{{ computedDate(reply.createdAt) }}</span>
              </div>
            </div>
          </div>
          <StoryLike :story="story"></StoryLike>

          <div>
            <StoryCommentInput
              ref="commentInput"
              :storyId="storyId"
              :nickname="nickname"
              :commentId="commentId"
              v-model:commentMode="commentMode"
              @move-detail="getStoryDetail"
              :customStyle="customStyle"
            ></StoryCommentInput>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRef, ref, defineProps, defineEmits, computed, onMounted, nextTick, getCurrentInstance } from 'vue'
import StoryCommentInput from '@/components/story/StoryCommentInput.vue'
import StoryImageCarousel from './StoryImageCarousel.vue'
import StoryLike from './StoryLike.vue'
import { detailStory } from '@/api/story'
import { useRouter } from 'vue-router'
const router = useRouter()

const getProfileUrl = (nickname) => {
  return `/profile/${nickname}`
}

const goToProfile = (nickname) => {
  router.push(getProfileUrl(nickname))
}
const { proxy } = getCurrentInstance()

const props = defineProps({
  story: {
    type: Object,
    required: true
  },
  storyId: {
    type: Number,
    required: true
  }
})

const story = ref(props.story)
const storyId = ref(props.storyId)
const nickname = ref('')
const commentId = ref(0)
const commentMode = ref(true)

const emits = defineEmits(['close'])

const closeModal = () => {
  emits('close')
}

const customStyle = ref({
  width: '90%',
  position: 'absolute',
  bottom: '0'
})

const computedWeather = computed(() => {
  return `/src/assets/weather/${story.value.weather}.png`
})

const computedEmotion = computed(() => {
  return `/src/assets/emotion/${story.value.emotion}.png`
})

const computedDate = (rawDate) => {
  const date = new Date(rawDate)
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}

const reply = (commentNickname, replyCommentId) => {
  nickname.value = commentNickname
  commentId.value = replyCommentId
  commentMode.value = false
  nextTick(() => {
    scrollToBottom()
    const commentInput = proxy.$refs.commentInput
    if (commentInput && typeof commentInput.setReply === 'function') {
      commentInput.setReply(nickname.value, commentId.value)
    } else {
      console.error('commentInput ref is not found or setReply is not a function')
    }
  })
}

const scrollToBottom = () => {
  nextTick(() => {
    const modalContent = proxy.$refs.modalContent
    if (modalContent) {
      modalContent.scrollTop = modalContent.scrollHeight
    } else {
      console.error('modalContent is not available')
    }
  })
}

const getStoryDetail = async (storyId) => {
  try {
    const result = await detailStory(storyId.value)
    story.value = result.data
  } catch (error) {
    console.log(error)
  }
}

const formatDate = (rawDate) => {
  const date = new Date(rawDate)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}

const formattedDate = computed(() => formatDate(story.value.createdAt))

const formatContent = (content) => {
  return content.replace(/\n/g, '<br>')
}

const hasLineBreaks = computed(() => story.value.content.includes('\n'))

const firstLine = computed(() => story.value.content.split('\n')[0])

const formattedContent = computed(() => formatContent(story.value.content))

const displayedContent = computed(() => {
  return formatContent(firstLine.value)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 3000;
}

.card {
  background-color: white;
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  position: relative;
}

.user-image {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.comment-user-image {
  border-radius: 50%;
  width: 25px;
  height: 25;
}

.content {
  display: flex;
  width: 100%;
  height: 100%;
}

.left-content {
  width: 60%;
}

.right-content {
  width: 40%;
  position: relative;
  padding: 10px;
}

.title {
  display: flex;
  align-items: center;
}

.comment {
  display: flex;
  align-items: flex-start;
}

.reply {
  margin-left: 20px;
  display: flex;
  align-items: center;
  background: pink;
}

.storyComment {
  text-align: center;
  align-items: center;
  padding: 10px;
}

.storyComment_img {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.menu {
  position: absolute;
  right: 0;
  margin: 0 25px;
}

.menu-list {
  position: absolute;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.menu-list button {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
}

.loc {
  display: flex;
  align-items: center;
}

.date {
  color: #808080;
  font-size: 10px;
}

.highlight {
  color: red;
}

.subcard {
  position: relative;
}

.title {
  display: flex;
  align-items: center;
  padding: 0 0 10px 0;
  font-size: 0.9rem;
}

.user-image {
  border-radius: 50%;
  text-align: center;
  width: 40px;
  height: 40px;
  justify-content: space-evenly;
  cursor: pointer;
}

.user-info-box div {
  margin: 2px 10px;
}

.image-box {
  margin: 0 10px;
}

.location-box {
  display: flex;
}

.scroll-box {
  overflow-y: auto;
  height: 430px;
  border-bottom: 0.5px solid #ddd;
}

a {
  text-decoration: none;
  color: black;
}
</style>
