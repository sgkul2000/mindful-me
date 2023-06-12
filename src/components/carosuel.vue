<template>
  <Carousel :itemsToShow="6.35" :wrapAround="true" :transition="500">
    <Slide v-for="(slide, index) in slides" class="rounded-2xl bg-amber-500" :key="index">
      <div class="indicator w-full h-64 border-amber-400">{{ getMaxEmotion(slide) }}</div>
      <div class="on_hover w-full h-64 border-amber-400 text-black">
        <h2>Your stats for the dayy</h2>
        <Progress />
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import Progress from "./progress.vue";

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Autoplay',
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    Progress
  },
  methods: {
    getMaxEmotion(input) {
      let emotion = "happy";
      Object.keys(input).reduce((prev, curr) => {
        if (typeof input[curr] !== "object") {
          let numVal = Number(input[curr]);
          if (numVal > prev) {
            emotion = curr;
            return numVal;
          } else {
            return prev;
          }
        }
      }, 0);
      return emotion;
    }
  }
})
</script>

<style scoped>
.carousel__slide:not(.carousel__slide--active) {
  transform: scale(.85);
}
.carousel__slide:hover > .indicator {
  display: none;
}
.on_hover {
  display: none;
}
.carousel__slide:hover > .on_hover {
  display: block;

}
</style>
