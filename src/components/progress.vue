<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "progress"
})
</script>

<template>
  <progress class="progress progress-primary" data-title="Happy" id="file" value="32" max="100"> 32% </progress>
</template>

<style scoped>
progress {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
progress:after {
  content: attr(data-title);
}
</style>
