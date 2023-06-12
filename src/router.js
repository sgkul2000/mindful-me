import { createRouter, createWebHashHistory } from "vue-router";
import api from "./appwrite";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("./views/Home.vue"),
    meta: { requiresAuth: true },
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
  {
    name: "report-week",
    path: "/report/week",
    component: () => import("./views/WeekReport.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // let user;
  // try {
  //   user = await api.getAccount();
  // } catch (err) {
  //   console.error(err);
  //   if (from.name && (from.name !== "login" || from.name !== "register")) {
  //     return next({ name: "login" });
  //   }
  //   console.log("after return");
  // }
  // if ((to.name === "login" || to.name === "register") && !!user)
  //   return next({ name: "home" });
  // else if (to.meta.requiresAuth && !user) next({ name: "login" });
  return next();
});

export default router;
