import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/404",
    name: "ErrorPage",
    component: () => import("~/views/errorPages/index.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("~/views/home/index.vue"),
    children: [
      {
        path: "/home/index",
        name: "首页",
        component: () => import("~/views/index/index.vue"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/home/log",
        name: "日志",
        component: () => import("~/views/log/index.vue"),
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
];

const index = createRouter({
  history: createWebHistory(),
  routes,
});
index.beforeEach((to, from) => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
});

index.afterEach((to, from) => {
  NProgress.done();
});

export default index;
