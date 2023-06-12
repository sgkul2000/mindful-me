<script>
import {defineComponent} from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default defineComponent({
  name: "journal",
  components: {
    QuillEditor
  }
})
</script>

<template>
  <QuillEditor theme="snow" />
</template>

<style scoped>

</style>
