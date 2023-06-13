<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @click="$emit">
      <div class="modal-container">
        <div class="header">
          <h3>Let's see how was your day ?</h3>
        </div>
        <div class="body">
          <figure>
            <img src="../assets/camera.png" alt="Trulli">
            <figcaption>Click a picture</figcaption>
          </figure>
          <figure>
            <img src="../assets/camera.png" alt="Trulli" >
            <figcaption>Answer a few questions</figcaption>
          </figure>
        </div>
        <div class="footer">
          <button class="modal-default-button" @click="$emit('close')">Close</button>
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
