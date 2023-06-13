
<template>
  <div>
    <label for="" class="text-white" >{{emotion}}</label>
    <div class="rounded-full overflow-hidden">
      <progress class="progress progress-primary text-white shadow-lg" value="32" max="100"> {{percent}} </progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressComponent",
  props: {
    emotion: {
      type: String,
      required: true
    },
    percent: {
      type: Number || String,
      required: true
    }
  },
  data() {
    return {
      
    }
  },


}
</script>


<style scoped>
progress {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  accent-color: coral;
}
progress:after {
  content: attr(data-title);
}

/* ::-webkit-progress-value {
  background-color: lightblue;
}

::-moz-progress-bar {
  background-color: lightblue;
} */
::-webkit-progress-bar {
  background-color: aliceblue;
}
</style>
