<template>
  <form @submit.prevent="handleSubmit" class="comment" :style="customStyle">
    <input @click.stop="" class="comment-input" type="text" placeholder="댓글 달기.." v-model="commentMessage" />
    <button @click.stop="" class="comment-btn">작성</button>
  </form>
</template>

<script setup>
import { commentStory, replyStory } from '@/api/story'
import { defineProps, defineExpose, defineModel, defineEmits, ref, watch } from 'vue'

const commentMessage = ref('')
const commentMode = defineModel('commentMode')
const emit = defineEmits(['move-detail'])

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

const storyId = ref(props.storyId)
const commentId = ref(props.commentId)

const sendComment = () => {
  commentStory(
    storyId.value,
    commentMessage.value,
    (result) => {
      console.log(result.data)
      emit('move-detail', storyId.value)
    },
    (error) => {
      console.log(error)
    }
  )
  commentMessage.value = ''
}

const setReply = (nickname, replyCommentId) => {
  commentId.value = replyCommentId
  commentMessage.value = '@' + nickname + ' '
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

// 답글 달다가 태그 지우면 -> 댓글 달기로 전환
watch(commentMessage, (newComment) => {
  if (!commentMode.value && newComment.length === 0) {
    commentMode.value = true
  }
})

// 폼 제출 핸들러
const handleSubmit = () => {
  if (commentMode.value) {
    sendComment()
  } else {
    sendReply()
  }
}

defineExpose({
  setReply
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
  padding: 5px 0;
}

.comment-btn {
  position: absolute;
  text-align: center;
  height: 100%;
  top: 0;
  right: 0;
}
</style>
