import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";
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
    name: "首页",
    component: () => import("~/views/home/index.vue"),
    children: [
      {
        path: "/home/index",
        name: "数据列表",
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
      {
        path: "/home/index/detail",
        name: "详情",
        component: () => import("~/views/detail/index.vue"),
      },
    ],
  },
];

const index = createRouter({
  history: createWebHashHistory(),
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
