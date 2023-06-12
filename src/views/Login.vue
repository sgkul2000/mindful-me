<template>
<div id="login" class="content-wrapper">
  <div class="flex items-center justify-center flex-col">
    <h1 class="outline-secondary outline-2 text-7xl mb-10 brand-shadow title-font">Login</h1>
    <input v-model="email" type="text" id="email" placeholder="Enter your email" class="appearance-none bg-white outline-none mb-3 rounded px-5 py-1" >
    <input v-model="password" type="password" id="password" placeholder="Enter the password" class="appearance-none bg-white outline-none mb-3 rounded px-5 py-1" >
    <button @click="login" class="appearance-none rounded-full text-3xl bg-primary text-white px-4 py-.5">
      next
    </button>
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