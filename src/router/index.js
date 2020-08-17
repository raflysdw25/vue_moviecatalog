import Vue from "vue";
import VueRouter from "vue-router";
import TvShow from "../views/TvShow.vue";
import Quiz from "../views/Quiz.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TvShow",
    component: TvShow
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active"
});

export default router;
