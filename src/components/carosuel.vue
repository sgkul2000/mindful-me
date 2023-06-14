<template>
  <Carousel :itemsToShow="slides.length > 7 ? 6.35 : slides.length" :wrapAround="true" :transition="500" @slide-start="updateIndex">
    <Slide v-for="(slide, index) in slides" class="rounded-3xl" :class="'slide-' + getMaxEmotion(slide)" :key="index">
      <div class="no_hover mt-auto w-full absolute bottom-0 left-0 pb-1 font-bold text-white shadow-lg">
        {{formatDate(slide)}}
      </div>
      <div class="on_hover w-full h-48 border-amber-400 text-black flex justify-center flex-col px-3">
        <h2 class="text-2xl bubbly-font text-white">Stats</h2>
        <div class="progress" v-for="objKey in Object.keys(processSlide(slide))" :key="objKey">
          <label for="" class="text-white">{{ objKey }}</label>
          <ProgressComponent class="py-1" classes="h-2" :percent="slide[objKey]" />
        </div>
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
import ProgressComponent from "./progress.vue";

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Autoplay',
  props: {
    slides: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      monthMap: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    ProgressComponent
  },
  methods: {
    updateIndex(val) {
      this.$emit("update", val.slidingToIndex)
    },
    processSlide(slide) {
      return {
        happy: slide.happy,
        angry: slide.angry,
        anxious: slide.anxious,
        neutral: slide.neutral,
      }
    },
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
    },
    formatDate(slide) {
      const date = new Date(slide.stamp);
      return date.getDate() + ' ' + this.monthMap[date.getMonth()];
    }
  }
})
</script>

<style scoped>
.carousel__slide:not(.carousel__slide--active) {
  transform: scale(.85);
}
.on_hover {
  opacity: 0;
}

.carousel__slide, .carousel__slide::before {
  font-family: "Gaegu", cursive;

  overflow: hidden;
  transition: all .5s ease;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.carousel__slide::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.carousel__slide > .no_hover{
  transition: all .5s ease;
}

.carousel__slide > .on_hover{
  transition: all .5s ease;
}

.carousel__slide:hover {
  transition: all .5s ease;
}
.carousel__slide:hover::before {
  opacity: 0;
}
.carousel__slide:hover > .no_hover {
  opacity: 0;

}
.carousel__slide:hover > .on_hover {
  opacity: 1;

}
</style>
