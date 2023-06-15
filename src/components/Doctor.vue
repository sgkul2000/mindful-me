<template>
  <article
    @click="$emit('click')"
    class="m-5 px-5 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all ease-in flex items-center"
  >
    <img
      :src="doctor.picture.medium"
      alt=""
      class="rounded-full mr-4 object-cover h-15 w-15"
    />
    <div>
      <h4>
        {{ doctorName }}
        <span v-if="doctor.gender === 'male'" class="text-sky-300">♂</span>
        <span v-else class="text-pink-300">♀</span>
      </h4>
      <div class="flex">
        <PhoneIcon class="mr-2 h-3 w-3 text-slate-500" />
        <EnvelopeIcon class="mr-2 h-3 w-3 text-slate-500" />
        <MapIcon class="mr-2 h-3 w-3 text-slate-500" />
      </div>
      <p>{{ doctor.location.state }}</p>
    </div>
  </article>
</template>

<style scoped></style>

<script>
import { PhoneIcon, EnvelopeIcon, MapIcon } from "@heroicons/vue/24/solid";
export default {
  name: "doctor-card",
  components: {
    PhoneIcon,
    EnvelopeIcon,
    MapIcon,
  },
  props: {
    doctor: {
      type: Object,
      required: true,
    },
  },
  computed: {
    doctorName() {
      return ["Dr.", this.doctor.name.first, this.doctor.name.last].join(" ");
    },
  },
};
</script>
