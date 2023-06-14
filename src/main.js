import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";

import store from "./store";

import Notifications from "@kyvg/vue3-notification";

import VueRoughNotation from 'vue-rough-notation';

createApp(App).use(router).use(store).use(Notifications).use(VueRoughNotation).mount("#app");
