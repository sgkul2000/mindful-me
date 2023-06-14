
<template>
  <div>
    <div class="flex items-center justify-start flex-col min-h-screen">
      <header class="text-charcoal w-full text-3xl p-6">
        <div class="cursor-pointer">
          <span class="header-route header-route-active">
            Month
          </span>
          |
          <span @click="$router.push({name: 'report-week'})" class="header-route text-xl text-slate-600">
            Week
          </span>
        </div>
      </header>

      <div class="row flex items-center justify-evenly relative w-full">
        <div class="w-3/12 text-charcoal rounded-3xl shadow-md overflow-hidden">
            <!-- <LineChart class="scale-125" :data="" /> -->
        </div>
        <div class="w-3/12 text-charcoal rounded-3xl slide-neutral slide-neutral-bg slide">
            <div class=" w-full h-36 text-black flex justify-center flex-col px-3">
            </div>
        </div>
        <div class="w-3/12 text-charcoal rounded-3xl shadow-md overflow-hidden">
            <!-- <LineChart class="scale-125" :data="" /> -->
        </div>
      </div>

      <div class="row w-11/12 mt-4">
        <div class="dates text-lg mb-2">
          {{slides[currentIndex].timestamp}}
        </div>

        <div class="flex flex-row items-stretch">
          <div class="stats flex flex-col w-5/12 pr-4">
            <div class="progress-wrapper" v-for="objKey in Object.keys(processSlide(slides[currentIndex]))" :key="objKey">
              <label for="" class="">{{objKey}}</label>
              <ProgressComponent :percent="slides[currentIndex][objKey]" :color="objKey" :background="'gray'" class="w-full mb-4 mt-2" />
            </div>
          </div>
          <div class="giphy w-7/12 shadow-xl h-20">
              <iframe
              v-if="getAvgMoodLottie === 'happy'"
              style="border-radius: 12px"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <iframe
              v-else-if="getAvgMoodLottie === 'neutral'"
              style="border-radius: 12px"
              src="https://open.spotify.com/embed/playlist/7alNDto4CIneB7AFmHVBqu?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <iframe
              v-else-if="getAvgMoodLottie === 'angry'"
              style="border-radius: 12px"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DWTC99MCpbjP8?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <iframe
              v-else-if="getAvgMoodLottie === 'anxious'"
              style="border-radius: 12px"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1tuUiirhaT3?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart.vue";

import Carosuel from "../components/carosuel.vue";
import api from "../appwrite.js"
import ProgressComponent from "../components/progress.vue";
import appwrite from "../appwrite.js";
export default {
  name: "reports",
  components: {
    Carosuel,
    ProgressComponent,
    LineChart
  },
  beforeMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    appwrite.getDocument('64873d304947190ba124', user['userId']).then((data) => {
      const moods = data.moods.map(el => JSON.parse(el))
      this.slides = moods.slice(-30)
    })
  },
  methods: {
    processSlide(slide) {
      return {
        happy: slide.happy,
        angry: slide.angry,
        anxious: slide.anxious,
        neutral: slide.neutral,
      }
    },
    onUpdate(val) {
      this.currentIndex = val;
    },
    getDates() {
      return "7th - 14th, Feb"
    },
    analyse() {
      const promise = api.uploadFile(this.$refs.fileUpload.files[0])

      promise.then(function (response) {
        console.log(response); // Success
      }, function (error) {
        console.log(error); // Failure
      })
    },
  },
  computed: {
    getAvgMoodLottie() {
      let emotion = "";
      let max = Math.max(
        this.getAvgMoodNeutral,
        this.getAvgMoodHappy,
        this.getAvgMoodAnxious,
        this.getAvgMoodAngry
      );
      if (max === this.getAvgMoodAngry) emotion = "angry";
      else if (max === this.getAvgMoodAnxious) emotion = "anxious";
      else if (max === this.getAvgMoodHappy) emotion = "happy";
      else if (max === this.getAvgMoodNeutral) emotion = "neutral";
      else emotion = "happy";
      console.log(emotion);
      return emotion;
    },
    getAvgMoodNeutral() {
      let neutral = this.slides.reduce((prev, curr) => {
        return prev + Number(curr.neutral);
      }, 0);
      return neutral / this.slides.length;
    },
    getAvgMoodHappy() {
      let happy = this.slides.reduce((prev, curr) => {
        return prev + Number(curr.happy);
      }, 0);
      return happy / this.slides.length;
    },
    getAvgMoodAnxious() {
      let anxious = this.slides.reduce((prev, curr) => {
        return prev + Number(curr.anxious);
      }, 0);
      return anxious / this.slides.length;
    },
    getAvgMoodAngry() {
      let angry = this.slides.reduce((prev, curr) => {
        return prev + Number(curr.angry);
      }, 0);
      return angry / this.slides.length;
    },
  },
  data() {
    return {
      currentIndex: 0,
      slides: []
    }
  },
}
</script>
<style scoped>

.slide {
  font-family: "Gaegu", cursive;

  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
