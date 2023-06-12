<template>
  <div class="content-wrapper flex-col">
<div class="content-background"></div>
    <h1 class="brand text-7xl brand-shadow mb-6" >Mindful Me</h1>

    <div class="home-content w-10/12 rounded-2xl text-charcoal bg-white">
      <div class="nav flex flex-row justify-between w-full border-b px-6 border-b-charcoal py-3">
        <div class="nav-welcome py-1">
          Hey Iresh, welcome back!
        </div>
        <div class="nav-buttons flex flex-row">
          <div class="btn-border mr-2">
            Read
          </div>
          <div class="btn-border mr-2">
            Journal
          </div>
          <div @click="logout" class="btn-border">
            Logout
          </div>
        </div>
      </div>
      <div class="options flex py-3 w-full">
        <div class="option mx-3 bg-pastel_red/30">
        <div class="image pt-3 pb-5">
          <img src="../assets/rainbow-woman.png" width="300px" height="400px" alt="" class="mx-auto pl-5">
        </div>
          <div class="btn-border">
            Connect
          </div>
        </div>
        <div class="option bg-pastel_yellow/30">
        <div class="image pt-3 pb-5">
          <img src="../assets/woman-reading.png" width="300px" height="400px" alt="" class="mx-auto px-5">
        </div>
          <div class="btn-border">
            Track
          </div><div class="btn-border">
            View
          </div>
        </div>
        <div class="option mx-3 bg-pastel_blue/30">
        <div class="image pt-3 pb-5">
          <img src="../assets/reading.png" width="300px" height="400px" alt="" class="mx-auto pl-6 pt-2">
        </div>
          <div class="btn-border">
            Read
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../appwrite"
export default {
  name: "home",
  methods: {
    logout() {
      api.deleteCurrentSession()
      this.$store.commit("SET_USER", null);
      this.$notify({
        title: "Logged out",
        text: "You will be redirected to the login page.",
      });
      setTimeout(() => {
        this.$router.push({ name: "login" });
      }, 1000)
    }
  }

}
</script>

<style>

</style>