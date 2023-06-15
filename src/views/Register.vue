<template>
<div id="login" class="content-wrapper">
  <div class="content-background"></div>
  <div class="flex flex-col items-center justify-center">
    <h1 class="brand text-7xl brand-shadow mb-6">Mindful Me</h1>
    <div class="flex items-center justify-center flex-col rounded-2xl text-charcoal bg-white border border-charcoal p-10">
    <h1 class="outline-secondary outline-2 text-5xl mb-7 brand-shadow title-font">Register</h1>
    <input v-model="email" type="text" id="email" placeholder="Enter your email" class="appearance-none bg-slate-100 outline-none mb-3 rounded-lg px-5 py-1" >
    <input v-model="name" type="text" id="name" placeholder="Enter your full name" class="appearance-none bg-slate-100 outline-none mb-3 rounded-lg px-5 py-1" >
    <input v-model="password" type="password" id="password" placeholder="Enter the password" class="appearance-none bg-slate-100 outline-none mb-3 rounded-lg px-5 py-1" >
    <RoughNotation class="mr-4" :is-show="notationnext" type="circle">
          <div class="cursor-pointer text-2xl" @mouseenter="notationnext = true" @mouseleave="notationnext = false" @click="createAccount"
                >
            Next
          </div>
        </RoughNotation>
  </div>
</div>
</div>
</template>

<script>
import api from "../appwrite.js"
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      notationnext: false,
    };
  },
  methods: {
    createAccount() {
      api.createAccount(this.email, this.password, this.name).then((res) => {
        this.$store.commit("SET_USER", res);
        console.log(res)
        api.createDocument(import.meta.env.VITE_APP_COLLECTION_ID, {
          email: this.email,
          name: this.name,
          moods: [],
          journal: ""
        }, res['userId']).then((data) => {
          this.$notify({
            title: "Account created",
            text: "You will be redirected to the login page.",
          });
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 1000)
        })
      }).catch((err) => {
        console.log(err)
      })

    }
  }

}
</script>

<style>

</style>
