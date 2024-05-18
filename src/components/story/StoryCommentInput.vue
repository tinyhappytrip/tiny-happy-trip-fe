<template>
    <div>
        <div class="comment">
                    <input 
                    @click.stop="" 
                    class="comment-input" 
                    type="text" 
                    placeholder="댓글 달기.."
                    v-model="commentMessage"/>
                    <button @click.stop="commentMode ? sendComment() : sendReply()" class="comment-btn">작성</button>
        </div>
    </div>
</template>

<script setup>

import { commentStory, replyStory } from "@/api/story"
import { defineProps, defineExpose, defineModel, defineEmits, toRefs, ref } from 'vue'

const props = defineProps({
    storyId: {
        type: Number,
        required: true,
    },
    comments: {
        type: Array,
        required: true
    },
    nickname: {
        type: String
    },
    commentId: {
        type: Number
    }
})

const {storyId, nickname, commentId} = toRefs(props)
const commentMessage = ref('')
const commentMode = defineModel('commentMode')
const emit = defineEmits(['move-detail'])

const sendComment = () => {
    commentStory(
        storyId.value,
        commentMessage.value,
        (result) => {
            console.log(result.value)
        },
        (error) => {
            console.log(error)
        }
    )
    commentMessage.value = '';
    emit('move-detail', storyId);
}

const setReply = () => {
    commentMessage.value = '@' + nickname.value + " "
}

const sendReply = () => {
    const words = commentMessage.value.split(" ")
    const remainingWords = words.slice(1)
    const resultComment = remainingWords.join(" ")
        replyStory(
        commentId.value,
        resultComment,
        (result) => {
            console.log(result)
        },
        (error) => {
            console.log(error)
        }
    )
    commentMode.value = true;
    commentMessage.value = '';
    emit('move-detail', storyId);
}

// 답글 달다가 태그 지우면 -> 댓글 달기로 전환
watch (commentMessage, (newComment, oldComment) => {
    if (!commentMode.value) {
        if (newComment.length == 0) {
        commentMode.value = true;
    } 
    }
})

defineExpose({
    setReply
})
</script>

<style scoped>
.comment {
    display: flex; 
    justify-content: space;
    margin-left: 35px;
}
.comment-input {
    border-bottom: 1px solid black; 
    width: 400px;
}

.comment-btn {
    background-color: black;
    color: white; 
    border-radius: 10px; 
    padding: 10px;
    width: 80px;
    height: 30px;
    text-align: center;
    margin: 0 auto;
}

</style>