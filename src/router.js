import VueRouter from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("./views/Home.vue"),
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

export default router;
