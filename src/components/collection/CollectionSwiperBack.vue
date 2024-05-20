<template>
  <div id="app">
    <swiper ref="mySwiper" :slides-per-view="3" centered-slides loop navigation pagination @swiper="onSwiper" class="swiper-container">
      <swiper-slide v-for="(story, index) in stories" :key="index" class="swiper-slide" @click="slideTo(index)">
        <div class="story-container">
          <div class="story-header">
            <img :src="story.profileImage" alt="Profile" class="profile-image" />
            <span class="username">{{ story.username }}</span>
          </div>
          <img :src="story.image" :alt="story.alt" class="story-image" />
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" ref="prevButton">‹</div>
      <div class="swiper-button-next" ref="nextButton">›</div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      stories: [
        {
          image: 'https://via.placeholder.com/300x500?text=Story+1',
          alt: 'Story 1',
          profileImage: 'https://via.placeholder.com/50',
          username: 'user1'
        },
        {
          image: 'https://via.placeholder.com/300x500?text=Story+2',
          alt: 'Story 2',
          profileImage: 'https://via.placeholder.com/50',
          username: 'user2'
        },
        {
          image: 'https://via.placeholder.com/300x500?text=Story+3',
          alt: 'Story 3',
          profileImage: 'https://via.placeholder.com/50',
          username: 'user3'
        },
        {
          image: 'https://via.placeholder.com/300x500?text=Story+4',
          alt: 'Story 4',
          profileImage: 'https://via.placeholder.com/50',
          username: 'user4'
        },
        {
          image: 'https://via.placeholder.com/300x500?text=Story+5',
          alt: 'Story 5',
          profileImage: 'https://via.placeholder.com/50',
          username: 'user5'
        }
      ],
      swiperInstance: null
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiperInstance = swiper
    },
    slideTo(index) {
      if (this.swiperInstance) {
        this.swiperInstance.slideToLoop(index, 0) // 두 번째 인자는 슬라이드 속도입니다. 0은 즉시 이동을 의미합니다.
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.swiper-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.story-container {
  position: relative;
  width: 300px; /* Adjust this size based on your needs */
  height: 500px; /* Adjust this size based on your needs */
}

.story-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-header {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  z-index: 10; /* Ensure header is on top of image */
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 1px 1px 2px black; /* Improve text visibility */
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  font-size: 30px;
  color: white;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-button-next {
  right: 10px;
}
</style>
