<script>
import api from "./appwrite"
export default {
  mounted() {
    api.deleteCurrentSession()
  }

}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
</style>
