<script>
import {defineComponent} from 'vue'
import Carosuel from "../components/carosuel.vue";
import api from "../appwrite.js"

export default defineComponent({
  name: "reports",
  components: {
    Carosuel,
  },
  computed: {
    getDates() {
      return "7th - 14th, Feb"
    }
  },
  data() {
    return {
      slides: [
        {
          "happy": 99,
          "angry": 53,
          "neutral": 77,
          "anxious": 41
        },
        {
          "happy": 42,
          "angry": 3,
          "neutral": 5,
          "anxious": 86
        },
        {
          "happy": 25,
          "angry": 11,
          "neutral": 53,
          "anxious": 3
        },
        {
          "happy": 12,
          "angry": 96,
          "neutral": 42,
          "anxious": 96
        },
        {
          "happy": 43,
          "angry": 64,
          "neutral": 41,
          "anxious": 86
        },
        {
          "happy": 27,
          "angry": 6,
          "neutral": 76,
          "anxious": 66
        },
        {
          "happy": 55,
          "angry": 40,
          "neutral": 16,
          "anxious": 53
        },
        {
          "happy": 22,
          "angry": 18,
          "neutral": 68,
          "anxious": 21
        },
        {
          "happy": 77,
          "angry": 27,
          "neutral": 32,
          "anxious": 55
        },
        {
          "happy": 10,
          "angry": 74,
          "neutral": 55,
          "anxious": 1
        },
        {
          "happy": 79,
          "angry": 22,
          "neutral": 14,
          "anxious": 46
        },
        {
          "happy": 80,
          "angry": 12,
          "neutral": 13,
          "anxious": 5
        },
        {
          "happy": 50,
          "angry": 65,
          "neutral": 62,
          "anxious": 64
        },
        {
          "happy": 9,
          "angry": 81,
          "neutral": 78,
          "anxious": 3
        }
      ]
    }
  },
  methods: {
    analyse() {
      const promise = api.uploadFile(this.$refs.fileUpload.files[0])

      promise.then(function (response) {
        console.log(response); // Success
      }, function (error) {
        console.log(error); // Failure
      })
    }
  }
})
</script>

<template>
  <div>
    <header>
      <h1>Week / </h1><h6>Month</h6>
      {{ getDates }}
    </header>
    <Carosuel :slides="slides" />

    <input type="file" ref="fileUpload" name="dumdum" id="" @change="analyse">
  </div>
</template>

<style scoped>

</style>
