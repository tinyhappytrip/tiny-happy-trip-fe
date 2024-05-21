<template>
  <CollectionDetail :collectionId="collectionId"></CollectionDetail>
  <swiper
    :spaceBetween="40"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false
    }"
    :navigation="true"
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="3"
    :keyboard="true"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide @click="showDetail(collection.collectionId)" v-for="(collection, index) in collections" :key="index">
      <h1>{{ collection.title }}</h1>
      <CollectionQuarterImage :items="collection.collectionItems"></CollectionQuarterImage>
    </swiper-slide>
  </swiper>
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

const collections = ref([])
// 하위뷰로 내려줄 collectionId
const collectionId = ref()
const showDetail = (id) => {
  // 모달 띄워주세여
  collectionId.value = id
  //CollectionDetail.vue
  console.log('Collection details:', id)
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

const modules = [EffectCoverflow, Pagination, Keyboard, Navigation, Autoplay]
</script>
<style>
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
}

.swiper-slide img {
  display: block;
  width: 100%;
}

h1 {
  color: black;
  font-weight: bold;
  display: block;
  margin-bottom: 20px; /* 이미지와 제목 사이의 간격 조정 */
}
</style>
