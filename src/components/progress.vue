
<template>
  <div>
    <div class="rounded-full overflow-hidden">
      <progress class="progress progress-primary text-white shadow-lg " :class="`progress-${color} progress-${background} ${classes}`" :value="percent" max="100"> {{percent}} </progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressComponent",
  props: {
    percent: {
      type: Number || String,
      required: true
    },
    color: {
      type: String,
      default: "primary"
    },
    background: {
      type: String,
      default: "default"
    },
    classes: {
      type: String,
      default: ""
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
.progress-default::-webkit-progress-bar {
  background-color: aliceblue;
}
.progress-gray::-webkit-progress-bar {
  background-color: lightgray;
}


.progress-primary::-webkit-progress-value {
  background-color: lightblue;
}
.progress-parimary::-moz-progress-bar {
  background-color: lightblue;
} 

.progress-angry::-webkit-progress-value {
  background-color: #F09357;
}
.progress-angry::-moz-progress-bar {
  background-color: #F09357;
} 

.progress-happy::-webkit-progress-value {
  background-color: #F2B2C4;
}
.progress-happy::-moz-progress-bar {
  background-color: #F2B2C4;
} 

.progress-anxious::-webkit-progress-value {
  background-color: #9EADD9;
}
.progress-anxious::-moz-progress-bar {
  background-color: #9EADD9;
} 

.progress-neutral::-webkit-progress-value {
  background-color: #F8E088;
}
.progress-neutral::-moz-progress-bar {
  background-color: #F8E088;
} 
</style>
