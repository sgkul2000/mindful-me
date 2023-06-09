import { createRouter, createWebHashHistory } from "vue-router";
import api from "./appwrite";
import store from "./store";

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
    name: "journal",
    path: "/journal",
    component: () => import("./views/journal.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "report-week",
    path: "/report/week",
    component: () => import("./views/WeekReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "report-month",
    path: "/report/month",
    component: () => import("./views/MonthReport.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "questionnaire",
    path: "/questionnaire",
    component: () => import("./views/Questionnaire.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "connect",
    path: "/connect",
    component: () => import("./views/Connect.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let user;
  try {
    user = await api.getAccount();
    store.commit("SET_USER", user);
    console.log(user);
  } catch (err) {
    console.error(err);
    if (from.name && (from.name !== "login" || from.name !== "register")) {
      if (to.name === "login" || to.name === "register") return next();
      else return next({ name: "login" });
    }
  }
  if ((to.name === "login" || to.name === "register") && !!user)
    return next({ name: "home" });
  else if (to.meta.requiresAuth && !user) next({ name: "login" });
  return next();
});

export default router;
