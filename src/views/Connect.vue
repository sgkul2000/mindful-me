<template>
  <div class="flex items-center justify-start flex-col min-h-screen h-full">
    <header class="text-charcoal w-full text-3xl p-6">
      <div class="flex justify-between">
        <div class="cursor-pointer">Find yourself a therapist today!</div>
        <RoughNotation class="mr-4" :is-show="notationread" type="circle">
          <div
            class="cursor-pointer"
            @mouseenter="notationread = true"
            @mouseleave="notationread = false"
            @click="openHashnode"
          >
            Home
          </div>
        </RoughNotation>
      </div>
    </header>
    <div class="doctors flex w-full">
      <div class="w-1/2 docter-wrapper">
        <Doctor
          v-for="(doctor, index) in doctors"
          :key="index"
          :doctor="doctor"
          @click="changeDoctor(index)"
        />
      </div>

      <div class="w-1/2 px-5 flex flex-col items-center">
        <div
          class="quote w-full mt-5 px-5 py-4 rounded-xl bg-green-900 text-white"
        >
          “{{ quote }}” <br /><br />
          — {{ author }}
        </div>
        <div
          v-if="doctor !== null"
          class="doctor-map-wrapper w-full sticky top-0 my-5 px-5 py-4 rounded-xl shadow-md"
        >
          <div class="inst">
            <div class="info flex items-center">
              <img
                :src="doctor.picture.large"
                alt="doctor"
                class="rounded-full h-15 w-15 object-cover mr-3 mb-3"
              />
              <div style="text-align: left">
                <span>
                  {{ ["Dr.", doctor.name.first, doctor.name.last].join(" ") }}
                </span>
                <p>
                  <span>{{ doctor.email }}</span>
                  <br />
                  <span>{{ doctor.phone }}</span>
                </p>
              </div>
            </div>
            <div class="mb-5">
              <p>
                <span
                  >{{ doctor.location.street.number }},{{
                    doctor.location.street.name
                  }}</span
                >
                <br />
                <span
                  >{{ doctor.location.city }} -
                  {{ doctor.location.state }}</span
                >
                <br />
                <span
                  >{{ doctor.location.country }} -
                  {{ doctor.location.postcode }}</span
                >
              </p>
            </div>
            <GoogleMap
              :api-key="import.meta.env.VITE_GOOGLE_MAP_API_KEY"
              class="h-32 w-full"
              :center="center"
              :zoom="15"
            >
              <Marker
                :key="index"
                v-for="(m, index) in getMarkers"
                :options="{ position: m.position }"
                @click="center = m.position"
              />
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Doctor from "../components/Doctor.vue";
import axios from "axios";
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  name: "reports",
  components: {
    Doctor,
    GoogleMap,
    Marker,
  },
  methods: {
    get_quote_of_the_day() {
      fetch("https://type.fit/api/quotes")
        .then((response) => response.json())
        .then((data) => {
          let quote = data[Math.floor(Math.random() * data.length)];
          if (quote.author == null) quote.author = "Unknown";
          this.quote = quote.text;
          this.author = quote.author;
        });
    },
    changeDoctor(index) {
      this.selectedDoctor = index;
      this.markers = [];

      this.markers.push({
        position: this.center,
        title: "Your location",
        opacity: 0.5,
      });
      let selectedDoctor = this.doctors[this.selectedDoctor];
      let doctorLocation = {
        lat: Number(selectedDoctor.location.latitude),
        lng: Number(selectedDoctor.location.longitude),
      };
      this.markers.push({ position: doctorLocation });
    },
  },
  computed: {
    doctor() {
      return this.doctors[this.selectedDoctor] || null;
    },
    getMarkers() {
      return this.markers;
    },
  },
  beforeMount() {
    this.get_quote_of_the_day();
    axios.get("https://mindful-me.shreeshkulkarni.com/doctors").then((resp) => {
      this.doctors = resp.data.doctors;
      let selectedDoctor = this.doctors[this.selectedDoctor];
      let doctorLocation = {
        lat: Number(selectedDoctor.location.latitude),
        lng: Number(selectedDoctor.location.longitude),
      };
      this.markers.push({ position: doctorLocation });
    });
    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      this.markers.push({
        position: this.center,
        title: "Your location",
        opacity: 0.5,
      });
    });
  },
  data() {
    return {
      author: "Lori Deschene",
      quote:
        "You don’t have to be positive all the time. It’s perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious. Having feelings doesn’t make you a negative person. It makes you human.",
      doctors: [],
      selectedDoctor: 0,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      notationread: false,
    };
  },
};
</script>
<style scoped></style>
