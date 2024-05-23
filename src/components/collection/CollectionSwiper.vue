<template>
  <div class="container">
    <swiper
      :spaceBetween="40"
      :navigation="true"
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="3"
      :keyboard="true"
      :coverflowEffect="{
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide style="background-color: white" @click="showDetail(collection)" v-for="(collection, index) in collections" :key="index">
        <div class="info-box">
          <div class="image-box">
            <img width="30px" height="30px" :src="imagePath(collection.profileImagePath)" />
          </div>
          <div class="user-box">
            <span class="title">{{ collection.nickname }}</span>
            <span class="sub">
              {{ collection.title }} <span class="date">{{ computedDate(collection.createdAt) }}</span>
            </span>
          </div>
        </div>

        <CollectionQuarterImage style="cursor: pointer" :items="collection.collectionItems"></CollectionQuarterImage>
      </swiper-slide>
    </swiper>
  </div>

  <!-- Modal -->
  <div class="modal" v-if="isModalVisible" @click.self="closeModal">
    <div class="modal-content">
      <CollectionDetail :collectionData="collectionData"></CollectionDetail>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectCoverflow, Pagination, Keyboard, Navigation, Autoplay } from 'swiper/modules'
import { ref, onMounted } from 'vue'
import { listRecommendCollections } from '@/api/collection-api'
import CollectionQuarterImage from './CollectionQuarterImage.vue'
import CollectionDetail from './CollectionDetail.vue'
import { imagePath } from '@/util/http-commons'

const collections = ref([])
// 하위뷰로 내려줄 collectionId
const collectionId = ref()
const isModalVisible = ref(false) // State for modal visibility
const collectionData = ref({})
const showDetail = (collection) => {
  collectionData.value = collection
  console.log(collectionData.value)
  isModalVisible.value = true // Show the modal
}

const closeModal = () => {
  isModalVisible.value = false // Hide the modal
}

onMounted(() => {
  listRecommendCollections(
    (result) => {
      collections.value = result.data
      console.log(collections.value)
      collectionId.value = collections.value[0].collectionId
    },
    (error) => {
      console.log(error)
    }
  )
})

const computedDate = (rawDate) => {
  const date = new Date(rawDate)
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}

const modules = [EffectCoverflow, Pagination, Keyboard, Navigation, Autoplay]
</script>

<style scoped>
.container {
  height: 100%;
  background-color: black;
  opacity: 0.8;
  padding-top: 200px;
}

.title {
  width: 100%;
  color: black;
  font-weight: bold;
  display: block;
  position: relative;
}

.sub {
  width: 100%;
  color: grey;
  font-weight: bold;
  display: block;
  position: relative;
  font-size: 0.9rem;
}

.swiper {
  width: 60%;
  margin-top: 100px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  opacity: 0.5; /* Set default opacity for all slides */
  transition: opacity 0.3s ease-in-out; /* Smooth transition for opacity change */
}

.swiper-slide-active {
  opacity: 1; /* Fully opaque for active slide */
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  padding: 20px;
  border-radius: 10px;
  height: 100%;
  overflow: auto;
}

.info-box {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.info-box .image-box {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.info-box .image-box > img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.user-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  width: 100%;
}

.date {
  margin-left: auto;
  position: absolute;
  right: 0;
  border: 0;
  font-size: 0.8rem;
}

.container .swiper-slide {
  width: 380px !important;
  height: 430px;
}
</style>
