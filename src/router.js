import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("./views/Home.vue"),
  },
  {
    name: "login",
    path: "/login",
    component: () => import("./views/Login.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: () => import("./views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
