<template>
  <div class="content-wrapper flex-col">
    <div class="content-background"></div>
    <h1 class="brand text-7xl brand-shadow mb-6">Mindful Me</h1>

    <div class="home-content w-10/12 rounded-2xl text-charcoal bg-white">
      <div class="nav flex flex-row justify-between w-full border-b px-6 border-b-charcoal py-3">
        <div class="nav-welcome py-1">
          Hey Iresh, welcome back!
        </div>
        <div class="nav-buttons flex flex-row items-center ">
          <RoughNotation class="mr-4" :is-show="notationread" type="circle">
            <div class="cursor-pointer" @mouseenter="notationread = true" @mouseleave="notationread = false"
                 @click="openHashnode">
              Read
            </div>
          </RoughNotation>
          <RoughNotation class="mr-4" :is-show="notationconnect" type="circle">
            <div class="cursor-pointer" @mouseenter="notationconnect = true" @mouseleave="notationconnect = false"
                 @click="openConnect">
              Connect
            </div>
          </RoughNotation>
          <RoughNotation :is-show="notationlogout" type="circle">
            <div class="cursor-pointer" @mouseenter="notationlogout = true" @mouseleave="notationlogout = false"
                 @click="logout">
              Logout
            </div>
          </RoughNotation>
        </div>
      </div>
      <div class="options flex py-3 w-full">
        <div class="option mx-3 bg-pastel_red/30">
          <div class="image pt-3 pb-5">
            <img src="../assets/rainbow-woman.png" alt="" class="mx-auto pl-5 w-100 h-100">
          </div>
          <div class="flex justify-evenly">
            <div class="btn-border" @click="$router.push('journal')">
              Journal
            </div>
          </div>
        </div>
        <div class="option bg-pastel_yellow/30">
          <div class="image pt-3 pb-5">
            <img src="../assets/woman-reading.png" alt="" class="mx-auto px-5 w-100 h-100">
          </div>
          <div class="flex justify-evenly">
            <div @click="trackFlow" class="btn-border">
              Track
            </div>
            <div @click="$router.push({name: 'report-week'})" class="btn-border">
              View
            </div>
          </div>
        </div>
        <div class="option mx-3 bg-pastel_blue/30">
          <div class="image pt-3 pb-5">
            <img src="../assets/reading.png" alt="" class="mx-auto pl-6 pt-2 w-100 h-100">
          </div>
          <div class="flex justify-evenly">
            <div class="btn-border" @click="openHashnode">
              Read
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" @close="showModal = false"/>
  </Teleport>
</template>

<script>
import api from "../appwrite"
import Modal from "../components/modal.vue"

export default {
  name: "home",
  components: {Modal},
  data() {
    return {
      showModal: false,
      notationread: false,
      notationconnect: false,
      notationlogout: false,
    }
  },
  methods: {
    logout() {
      api.deleteCurrentSession()
      this.$store.commit("SET_USER", null);
      this.$notify({
        title: "Logged out",
        text: "You will be redirected to the login page.",
      });
      setTimeout(() => {
        this.$router.push({name: "login"});
      }, 1000)
    },
    trackFlow() {
      this.showModal = true;
    },
    openHashnode() {
      window.open('https://hashnode.com/n/mental-health', '_blank')
    },
    openConnect() {
      window.open('https://www.google.com/search?q=Psychiatrist+near+me', '_blank')
    }
  }

}
</script>

<style>

</style>
