<script>
import axios from 'axios';
import appwrite from "../appwrite.js";

export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      mode: "option"
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
              console.log(resp);
              this.emotionData = {
                happy: resp.data[0].emotion.happy,
                angry: resp.data[0].emotion.angry,
                anxious: resp.data[0].emotion.fear,
                neutral: resp.data[0].emotion.neutral,
              };
              const userData = await appwrite.getDocument('64873d304947190ba124', user['userId']);
              const moods = userData['moods'].map(el => JSON.parse(el));
              if(moods.length > 0) {
                const lastDate = new Date(userData.moods.at(-1).stamp);
                if (lastDate.getDate() === new Date().getDate()) {
                  moods.pop();
                }
              }
              await appwrite.updateDocument('64873d304947190ba124', user['userId'], {
                moods: [
                  ...userData.moods,
                  JSON.stringify({
                    ...this.emotionData,
                    stamp: new Date(),
                  }),
                ],
              }).then(() => this.$router.push('/'));
            })
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
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div v-if="mode === 'option'">
          <div class="header">
            <h3>Let's see how was your day ?</h3>
          </div>
          <div class="body">
            <figure @click="clickPicture">
              <img src="../assets/camera.png" alt="Trulli">
              <figcaption>Click a picture</figcaption>
            </figure>
            <figure @click="$router.push('/questionnaire')">
              <img src="../assets/camera.png" alt="Trulli">
              <figcaption>Answer a few questions</figcaption>
            </figure>
          </div>
          <div class="footer">
            <button class="modal-default-button" @click="$emit('close')">Close</button>
          </div>
        </div>
        <div v-else>
          <video id="video" autoplay width="500" height="300" ref="video"></video>
          <canvas style="display: none" ref="canvas"/>
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

.modal-container {
  width: 50vw;
  height: 50vh;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 30px;
  transition: all 0.3s ease;

  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
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
</style>
