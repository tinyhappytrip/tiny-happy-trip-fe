<template>
  <form @submit.prevent="handleSubmit" class="comment" :style="customStyle">
    <input ref="inputRef" class="comment-input" type="text" placeholder="댓글 달기.." v-model="commentMessage" style="width: 90%" />
    <button class="comment-btn">작성</button>
  </form>
</template>

<script setup>
import { ref, watch, defineProps, defineExpose, defineModel, defineEmits, nextTick } from 'vue'
import { commentStory, replyStory } from '@/api/story-api'

const props = defineProps({
  storyId: {
    type: Number,
    required: true
  },
  nickname: {
    type: String
  },
  commentId: {
    type: Number
  },
  customStyle: {
    type: Object
  }
})

const commentMessage = ref('')
const commentMode = defineModel('commentMode')
const emit = defineEmits(['move-detail'])

const storyId = ref(props.storyId)
const commentId = ref(props.commentId)

const inputRef = ref(null)

const sendComment = () => {
  commentStory(
    storyId.value,
    commentMessage.value,
    (result) => {
      emit('move-detail', storyId.value)
    },
    (error) => {
      console.log(error)
    }
  )
  commentMessage.value = ''
}

const setReply = async (nickname, replyCommentId) => {
  commentId.value = replyCommentId
  commentMessage.value = '@' + nickname + ' '
  commentMode.value = false
  await nextTick() // Await nextTick to ensure DOM updates
  focusInput()
}

const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

const sendReply = () => {
  const words = commentMessage.value.split(' ')
  const remainingWords = words.slice(1)
  const resultComment = remainingWords.join(' ')
  replyStory(
    commentId.value,
    resultComment,
    (result) => {
      console.log(result)
      emit('move-detail', storyId.value)
    },
    (error) => {
      console.log(error)
    }
  )
  commentMode.value = true
  commentMessage.value = ''
}

// Watch commentMessage to switch back to comment mode if the message is cleared
watch(commentMessage, (newComment) => {
  if (!commentMode.value && newComment.length === 0) {
    commentMode.value = true
  }
})

const handleSubmit = () => {
  if (commentMode.value) {
    sendComment()
  } else {
    sendReply()
  }
}

defineExpose({
  setReply,
  focusInput
})

watch(commentMessage, (newVal) => {
  if (newVal.length > 45) {
    commentMessage.value = newVal.slice(0, 45)
  }
})
</script>

<style scoped>
.comment {
  display: flex;
  padding: 15px 0 10px 0;
  justify-content: space-between;
  position: relative;
}
.comment-input {
  border-bottom: 1px solid black;
  width: 100%;
  padding: 5px 6px;
}

.comment-btn {
  position: absolute;
  text-align: center;
  height: 100%;
  top: 0;
  right: 0;
}
</style>
