<template>
  <div class="modal-overlay" @click.stop="closeModal">
    <v-card class="card" ref="modalContent">
      <span class="title1">
        <img :src="story.userImage ? story.userImage : '/src/assets/main/user.png'" class="user-image" />
        <span>{{ story.nickname }}</span>
        <span class="date"> {{ computedDate(createdAt) }}</span>
        <span>날씨</span><img width="30px" :src="computedWeather" /> <span>감정</span><img width="30px" :src="computedEmotion" />
        <button @click.stop="openMenu = !openMenu" class="menu_btn">
          <img src="@/assets/main/menu.png" width="35px" class="menu" />
        </button>
        <v-list v-if="openMenu">
          <v-list-item @click.stop="onEdit">
            <v-list-item-title><button>수정하기</button></v-list-item-title>
          </v-list-item>
          <v-list-item @click.stop="onDelete">
            <v-list-item-title><button>삭제하기</button></v-list-item-title>
          </v-list-item>
        </v-list>
      </span>
      <div class="content">
        <div class="left-content">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
            class="align-end"
            width="350px"
            height="350px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            cover
          ></v-img>

          <StoryLike :story="story"></StoryLike>
        </div>

        <div class="right-content">
          <div>
            <p>위치</p>
            <span class="loc">
              <img src="@/assets/main/location.png" width="20px" />
              <span>{{ story.location }}</span>
            </span>
          </div>

          <!-- 지도 좌표 -->
          {{ story.latitude }}
          {{ story.longitude }}
          <div style="height: 200px; background: pink"></div>
          <hr />

          <div>
            {{ story.content }}
          </div>
          <hr />
          <div v-for="comment in story.storyComments" :key="comment.storyCommentId">
            <div class="comment">
              <div class="storyComment">
                <img width="10px" class="storyComment_img" :src="comment.userImage ? comment.userImage : '/src/assets/main/user.png'" />
                <p>{{ comment.nickname }}</p>
              </div>
              <span class="alert_content">{{ comment.content }}</span>
              <span class="alert_content date">{{ computedDate(comment.createdAt) }}</span>
              <button @click.stop="reply(comment.nickname, comment.storyCommentId)">답글달기</button>
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

          <div>
            <StoryCommentInput
              ref="commentInput"
              :storyId="storyId"
              :nickname="nickname"
              :commentId="commentId"
              v-model:commentMode="commentMode"
              @move-detail="getStoryDetail"
            ></StoryCommentInput>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { detailStory } from '@/api/story'
import { toRef, ref, defineProps, defineEmits, computed, onMounted, nextTick, getCurrentInstance } from 'vue'
import StoryCommentInput from '@/components/story/StoryCommentInput.vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  storyId: {
    type: Number,
    required: true
  }
})

const storyId = ref(props.storyId)
const story = ref({})
const createdAt = ref('')
const nickname = ref('')
const commentId = ref(0)
const commentMode = ref(true)
const openMenu = ref(false)

const emits = defineEmits(['close'])

const closeModal = () => {
  emits('close')
}

const getStoryDetail = () => {
  console.log('서버에서 스토리 상세 정보 받아옴.')
  console.log(storyId.value)

  detailStory(
    storyId.value,
    (result) => {
      story.value = result.data
      createdAt.value = story.value.createdAt
    },
    (error) => {
      console.log(error)
    }
  )
}

const computedWeather = computed(() => {
  return '/src/assets/weather/' + story.value.weather + '.png'
})

const computedEmotion = computed(() => {
  return '/src/assets/emotion/' + story.value.emotion + '.png'
})

const computedDate = (rawDate) => {
  console.log(rawDate)
  const date = rawDate.split(' ')[0]
  const yearMonthDay = date.split('-')
  const year = yearMonthDay[0].slice(-2)
  const month = yearMonthDay[1]
  const day = yearMonthDay[2]
  return year + '년 ' + month + '월 ' + day + '일'
}

const reply = (commentNickname, replyCommentId) => {
  nickname.value = commentNickname
  commentId.value = replyCommentId
  commentMode.value = false
  // DOM이 업데이트된 후에 스크롤을 수행합니다.
  nextTick(() => {
    scrollToBottom()
    // ref를 사용하여 sendReply 메서드 호출
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
      console.log('scroll 완료')
      console.log('modalContent.scrollHeight:', modalContent.scrollHeight)
      modalContent.scrollTop = modalContent.scrollHeight
      console.log('modalContent.scrollTop:', modalContent.scrollTop)
    } else {
      console.error('modalContent is not available')
    }
  })
}

onMounted(() => {
  getStoryDetail()
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transform: translateY(-10%);
}

.card {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  padding: 10px;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
}

.user-image {
  border-radius: 50%;
  text-align: center;
  width: 30px;
}

.content {
  display: flex;
}

.right-content * {
  margin: 5px 0;
}

.left-content * {
  margin-bottom: 20px;
}

.left-content {
  flex: 1;
  padding-right: 10px;
  width: 50%;
  border-right: 1px solid black;
}

.right-content {
  flex: 2;
  padding: 0px 20px;
  width: 50%;
}

.title1 {
  display: flex;
  align-items: center;
}

.align-end {
  margin-top: 20px;
}

.title1 > * {
  padding: 0 5px;
}

hr {
  margin: 10px 0;
}

.weather-and-emotion > * {
  margin-right: 10px;
}

.comment {
  display: flex;
  justify-items: center;
  align-items: center;
}

.reply {
  margin-left: 20px;
  display: flex;
  justify-items: center;
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

.loc {
  display: flex;
  align-items: center;
}

.loc > * {
  padding-right: 5px;
  font-size: 15px;
}

.date {
  color: #808080;
  font-size: 10px;
}
</style>
