<template>
  <div>
    <div class="buttons">
      <button @click.stop="like"><img :src="story.like ? '/src/assets/save-on.png' : '/src/assets/save-off.png'" width="25px" /></button>
      <span style="padding: 10px 5px">책갈피 {{ story.likeCount }}개</span>
    </div>
  </div>
</template>

<script setup>
import { likeStory } from '@/api/story'
import { defineProps, toRefs } from 'vue'
const { story } = defineProps({
  story: {
    type: Object,
    required: true
  }
})

const like = () => {
  console.log('좋아요 누름')
  console.log(story.value.storyId)

  likeStory(props.story.storyId, (result) => {
    console.log(result)
    story.value.like = !story.value.like
    if (!story.value.like) {
      story.value.likeCount--
    } else {
      story.value.likeCount++
    }
  })
}
</script>

<style scoped>
.buttons {
  display: flex;
  justify-items: center;
}
.buttons > * {
  margin: 0 5px;
}
</style>
