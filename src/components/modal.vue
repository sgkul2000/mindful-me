<script>
import axios from 'axios';
import appwrite from "../appwrite.js";
import ProgressComponent from "./progress.vue";

export default {
  components: {ProgressComponent},
  props: {
    show: Boolean
  },
  data() {
    return {
      mode: "option",
      emotionData: {},
      pictureClicked: false,
      responseReceived: false,
      retry: 0,
    }
  },
  methods: {
    async clickPicture() {
      this.mode = 'camera'
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      this.$refs.video.srcObject = stream;
      setTimeout(() => {
        this.pictureClicked = true;
        const canvas = this.$refs.canvas;
        canvas
            .getContext("2d")
            .drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL("image/jpeg");
        console.log(image_data_url)
        const user = JSON.parse(localStorage.getItem('user'))
        axios
            .post("https://mindful-me.shreeshkulkarni.com/image", {data_url: image_data_url})
            .then(async (resp) => {
              this.responseReceived = true;
              this.emotionData = {
                happy: resp.data[0].emotion.happy,
                angry: resp.data[0].emotion.angry,
                anxious: resp.data[0].emotion.fear,
                neutral: resp.data[0].emotion.neutral,
              }
              const userData = await appwrite.getDocument('648a38b0c47f74084842', user['$id']);
              const moods = userData['moods'].map(el => JSON.parse(el));
              if (moods.length > 0) {
                const lastDate = Number(moods.at(-1).stamp.split('T')[1].split('-').at(-1));
                console.log(lastDate, new Date().getDate())
                if (lastDate === new Date().getDate()) {
                  userData.moods.pop();
                }
              }
              appwrite.updateDocument('648a38b0c47f74084842', user['$id'], {
                moods: [
                  ...userData.moods,
                  JSON.stringify({
                    ...this.emotionData,
                    stamp: new Date(),
                  }),
                ],
              }).then(() => this.$router.push('/'));
            }).catch(err => {
              console.error("here")
              console.error(err)
              if (err.response && err.response.data && err.response.data === "Face could not be detected. Please confirm that the picture is a face photo or consider to set enforce_detection param to False.") {
                if(this.retry < 3) {
                  this.$notify({
                    title: 'Error',
                    text: 'Face could not be detected. Please try again',
                  });
                  this.retry +=1;
                  this.pictureClicked = false;
                  this.responseReceived = false;
                  this.clickPicture();
                } else {
                  this.$notify({
                    title: 'Error',
                    text: 'Face could not be detected',
                  });
                  this.$emit('close')
                }
              }
              });
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        stream.getVideoTracks().forEach(el => el.enabled = false)
      }, 2000)
    }
  },
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask flex">
      <div class="modal-container">
        <div v-if="mode === 'option'" class="flex flex-col items-center justify-between">
          <div class="header">
            <h3 class="text-2xl mb-4">Let's see how was your day ?</h3>
          </div>
          <div class="body">
            <figure @click="clickPicture" class="cursor-pointer px-4">
              <img src="../assets/camera.png" alt="Trulli">
              <figcaption>Click a picture</figcaption>
            </figure>
            <figure @click="$router.push('/questionnaire')" class="cursor-pointer px-4">
              <img src="../assets/desk.png" alt="Trulli">
              <figcaption>Answer a few questions</figcaption>
            </figure>
          </div>
          <div class="footer">
            <button class="modal-default-button" @click="$emit('close')">Close</button>
          </div>
        </div>
        <div v-else class="flex justify-center items-center flex-col w-full h-full">
          <div v-if="pictureClicked && !responseReceived" class="h-32 flex items-center">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
          <div v-else-if="responseReceived && pictureClicked" class="w-full flex flex-col items-center justify-center">
            <div class="progress w-full"
                 v-for="objKey in Object.keys(emotionData)" :key="objKey">
              <label>{{ objKey }}</label>
              <ProgressComponent class="py-1" classes="h-2" :percent="emotionData[objKey]"/>
            </div>
            <div class="message w-100 rounded-2xl text-white">
              This data is not 100% accurate!
            </div>
          </div>
          <div v-else>
            <video id="video" autoplay width="500" height="300" ref="video"></video>
            <canvas style="display: none" ref="canvas" />
          </div>
          <div class="footer">
            <button class="modal-default-button" @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  transition: opacity 0.3s ease;
}

.message {
  background-color: #7c8798;
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.modal-container {
  width: 50vw;
  /* height: 50vh; */
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 30px;
  transition: all 0.3s ease;

  /* display: grid;
  grid-template-rows: 1fr 6fr 1fr; */
}

.header {
  text-align: center;
}

.body {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.body img {
  height: 30vh;
}

.footer {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.modal-default-button {
  display: inline;
  cursor: pointer;
  border-radius: 0.5rem;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(54 69 79 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  text-align: center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* spinner styles */
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #36454F;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #36454F transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
