<template>
  <div>
    <div class="flex items-center justify-start flex-col min-h-screen">
      <header class="text-charcoal w-full text-3xl p-6">
        <div class="flex justify-between">
          <div class="cursor-pointer">
            <span class="header-route header-route-active text-"> Week </span>
            |
            <span
              @click="$router.push({ name: 'report-month' })"
              class="header-route text-xl text-slate-600"
            >
              Month
            </span>
          </div>
          <RoughNotation class="mr-4" :is-show="notationread" type="circle">
            <div
              class="cursor-pointer"
              @mouseenter="notationread = true"
              @mouseleave="notationread = false"
              @click="openHashnode"
            >
              Home
            </div>
          </RoughNotation>
        </div>
        <div class="dates text-lg">
          {{ getDates() }}
        </div>
      </header>

      <div class="w-full text-charcoal">
        <Carosuel :slides="slides" @update="onUpdate" />
      </div>

      <div class="row w-11/12 mt-4">
        <div class="dates text-lg mb-2">
          {{ slides[currentIndex].timestamp }}
        </div>

        <div class="flex flex-row items-stretch">
          <div class="stats flex flex-col w-5/12 pr-4">
            <div
              class="progress-wrapper"
              v-for="objKey in Object.keys(processSlide(slides[currentIndex]))"
              :key="objKey"
            >
              <label for="" class="">{{ objKey }}</label>
              <ProgressComponent
                :percent="slides[currentIndex][objKey]"
                :color="objKey"
                :background="'gray'"
                class="w-full mb-4 mt-2"
              />
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
import Carosuel from "../components/carosuel.vue";
import api from "../appwrite.js";
import ProgressComponent from "../components/progress.vue";
import appwrite from "../appwrite.js";
export default {
  name: "reports",
  components: {
    Carosuel,
    ProgressComponent,
  },
  methods: {
    processSlide(slide) {
      return {
        happy: slide.happy,
        angry: slide.angry,
        anxious: slide.anxious,
        neutral: slide.neutral,
      };
    },
    onUpdate(val) {
      this.currentIndex = val;
    },
    getDates() {
      return "7th - 14th, Feb";
    },
    analyse() {
      const promise = api.uploadFile(this.$refs.fileUpload.files[0]);

      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
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
  beforeMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    appwrite
      .getDocument(import.meta.env.VITE_APP_COLLECTION_ID, user["userId"])
      .then((data) => {
        const moods = data.moods.map((el) => JSON.parse(el));
        this.slides = moods;
      });
  },
  data() {
    return {
      notationread: false,
      currentIndex: 0,
      slides: [
        {
          happy: 99,
          angry: 53,
          neutral: 77,
          anxious: 41,
          timestamp: "24 July",
        },
        {
          happy: 42,
          angry: 3,
          neutral: 5,
          anxious: 86,
          timestamp: "03 March",
        },
        {
          happy: 25,
          angry: 11,
          neutral: 53,
          anxious: 3,
          timestamp: "12 Dec",
        },
        {
          happy: 12,
          angry: 96,
          neutral: 42,
          anxious: 96,
          timestamp: "30 June",
        },
        {
          happy: 43,
          angry: 64,
          neutral: 41,
          anxious: 86,
          timestamp: "02 August",
        },
        {
          happy: 27,
          angry: 6,
          neutral: 76,
          anxious: 66,
          timestamp: "08 Nov",
        },
        {
          happy: 55,
          angry: 40,
          neutral: 16,
          anxious: 53,
          timestamp: "21 Jan",
        },
        {
          happy: 22,
          angry: 18,
          neutral: 68,
          anxious: 21,
          timestamp: "19 Feb",
        },
        {
          happy: 77,
          angry: 27,
          neutral: 32,
          anxious: 55,
          timestamp: "24 April",
        },
        {
          happy: 10,
          angry: 74,
          neutral: 55,
          anxious: 1,
          timestamp: "25 Dec",
        },
        {
          happy: 79,
          angry: 22,
          neutral: 14,
          anxious: 46,
          timestamp: "15 August",
        },
        {
          happy: 80,
          angry: 12,
          neutral: 13,
          anxious: 5,
          timestamp: "26 Jan",
        },
        {
          happy: 50,
          angry: 65,
          neutral: 62,
          anxious: 64,
          timestamp: "14 Oct",
        },
        {
          happy: 9,
          angry: 81,
          neutral: 78,
          anxious: 3,
          timestamp: "04 Sept",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
