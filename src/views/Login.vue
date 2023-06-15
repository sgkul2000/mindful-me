<template>
<div id="login" class="content-wrapper">
  <div class="content-background"></div>
  <div class="flex flex-col items-center justify-center">
    <h1 class="brand text-7xl brand-shadow mb-6">Mindful Me</h1>
    <div class="flex items-center justify-center flex-col rounded-2xl text-charcoal bg-white border border-charcoal p-10">
        <h1 class="outline-secondary outline-2 text-5xl mb-7 brand-shadow title-font">Login</h1>
        <input v-model="email" type="text" id="email" placeholder="Enter your email" class="appearance-none bg-slate-100 outline-none mb-3 rounded-lg px-5 py-1" >
        <input v-model="password" type="password" id="password" placeholder="Enter the password" class="appearance-none bg-slate-100 outline-none mb-3 rounded-lg px-5 py-1" >
        <RoughNotation class="mr-4" :is-show="notationnext" type="circle">
          <div class="cursor-pointer text-2xl" @mouseenter="notationnext = true" @mouseleave="notationnext = false" @click="login"
                >
            Next
          </div>
        </RoughNotation>
    </div>
  </div>
</div>
</template>

<script>
import api from "../appwrite"
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      notationnext: false,
    };
  },
  methods: {
    login() {
      api.createSession(this.email, this.password).then((res) => {
        console.log(res)
        this.$store.commit("SET_USER", res);
        this.$notify({
          title: "Logged in",
          text: "You will be redirected to the home page.",
        });
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 1000)
      }).catch((err) => {
        console.log(err)
      })

    }
  }

}
</script>

<style>

</style>