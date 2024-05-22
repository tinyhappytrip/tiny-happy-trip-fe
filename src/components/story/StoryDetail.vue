<template>
  <div class="modal-overlay">
    <div class="card" ref="modalContent">
      <font-awesome-icon :icon="['fas', 'xmark']" size="2xl" class="close-button" @click.stop="closeModal" />
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
            <div ref="map" style="width: 100%; height: 200px"></div>
          </div>
          <div class="scroll-box">
            <div
              style="line-height: 1.3; border-bottom: 0.5px solid rgb(221, 221, 221); display: block; padding: 10px 0px; font-size: 0.9rem"
              v-html="formattedContent"
            ></div>
            <div v-for="comment in story.storyComments" :key="comment.storyCommentId">
              <div class="comment" style="padding-top: 30px">
                <div>
                  <RouterLink :to="`/profile/${comment.userId}`">
                    <img :src="`http://localhost:8080/image?path=${story.userImage}`" width="10px" style="margin-right: 5px" class="comment-user-image" />
                  </RouterLink>
                </div>
                <div style="display: inline">
                  <p style="font-size: 0.8rem; margin-right: 10px; line-height: 1.3">
                    <RouterLink :to="`/profile/${comment.userId}`">
                      {{ comment.nickname }}
                    </RouterLink>
                    &nbsp;&nbsp;
                    {{ comment.content }}
                  </p>
                  <div>
                    <span class="alert_content date">{{ computedDate(comment.createdAt) }}</span>
                    <button style="font-size: 0.7rem; margin-left: 10px" @click.stop="reply(comment.nickname, comment.storyCommentId)">답글달기</button>
                    <button
                      v-if="comment.replies.length !== 0"
                      style="font-size: 0.7rem; margin-left: 10px"
                      @click.stop="toggleReplies(comment.storyCommentId)"
                    >
                      {{ replyVisibility[comment.storyCommentId] ? '닫기' : '답글보기' }}
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="replyVisibility[comment.storyCommentId]" class="reply" v-for="reply in comment.replies" :key="reply.storyReplyId">
                <div class="comment" style="padding-top: 10px">
                  <div>
                    <RouterLink :to="`/profile/${reply.userId}`">
                      <img :src="`http://localhost:8080/image?path=${reply.userImage}`" width="10px" style="margin-right: 5px" class="comment-user-image" />
                    </RouterLink>
                  </div>
                  <div style="display: inline">
                    <p style="font-size: 0.8rem; margin-right: 10px; line-height: 1.3">
                      <RouterLink :to="`/profile/${reply.userId}`">
                        {{ reply.nickname }}
                      </RouterLink>
                      &nbsp;&nbsp;
                      {{ reply.content }}
                    </p>
                    <div>
                      <span class="alert_content date">{{ computedDate(reply.createdAt) }}</span>
                    </div>
                  </div>
                </div>
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
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRef, ref, defineProps, defineEmits, computed, onMounted, nextTick, getCurrentInstance, onUnmounted } from 'vue'
import StoryCommentInput from '@/components/story/StoryCommentInput.vue'
import StoryImageCarousel from './StoryImageCarousel.vue'
import StoryLike from './StoryLike.vue'
import { detailStory } from '@/api/story-api'
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
  bottom: '10px',
  padding: '20px 0'
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
      commentInput.setReply(commentNickname, replyCommentId)
      nextTick(() => {
        commentInput.focusInput() // Ensure the focusInput method is called after setReply
      })
    } else {
      console.error('commentInput ref is not found or methods are not available')
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

const getStoryDetail = (storyId) => {
  detailStory(
    storyId,
    (result) => {
      story.value = result.data
    },
    (error) => console.log(error)
  )
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
const formattedContent = computed(() => formatHashtags(story.value.content))

const formatHashtags = (text) => {
  return text.replace(/\r\n|\n/g, '<br>').replace(/#(\S+)/g, '<span style="color: #003285; font-weight:bold">#$1</span>')
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

const replyVisibility = ref({})

const toggleReplies = (commentId) => {
  replyVisibility.value[commentId] = !replyVisibility.value[commentId]
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  if (window.kakao && window.kakao.maps) {
    const container = proxy.$refs.map
    const options = {
      center: new kakao.maps.LatLng(story.value.longitude, story.value.latitude),
      level: 4,
      draggable: false, // 지도를 드래그할 수 없도록 설정
      scrollwheel: false, // 마우스 휠로 확대/축소할 수 없도록 설정
      disableDoubleClickZoom: true // 더블클릭 확대를 막습니다.
    }
    const map = new kakao.maps.Map(container, options)

    const markerPosition = new kakao.maps.LatLng(story.value.longitude, story.value.latitude)
    const marker = new kakao.maps.Marker({
      position: markerPosition
    })

    const infowindowContent = `
      <div style="width: 150px; text-align: center; font-size: 12px; padding: 6px 0;">
        ${story.value.placeName}
      </div>
    `

    const infowindow = new kakao.maps.InfoWindow({
      content: infowindowContent
    })
    infowindow.open(map, marker)
    marker.setMap(map)

    // Add event listener to marker to open Kakao Map search page
    kakao.maps.event.addListener(marker, 'click', function () {
      const searchUrl = `http://place.map.kakao.com/${story.value.placeId}`
      window.open(searchUrl, '_blank')
    })
  } else {
    console.error('Kakao Maps SDK not loaded')
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
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
  width: 1100px;
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
  padding: 20px 15px;
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
  margin-left: 30px;
  display: flex;
  align-items: center;
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
  height: 400px;
  border-bottom: 0.5px solid #ddd;
}

a {
  text-decoration: none;
  color: black;
}

.close-button {
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

/* 카카오 지도 축척 바 숨기기 */
#scaleControl {
  display: none !important;
}

.alert_content {
  font-size: 0.7rem;
}
</style>
