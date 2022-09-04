<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo">
        <img src="../assets/logo-white.png" class="logo-image" />
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="clickToIndex">首页</a-menu-item>
        <a-menu-item key="2" @click="clickToLog">日志</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <slot name="breadcrumb" />
      <!-- <a-breadcrumb style="margin: -16px 0 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb> -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <slot name="footer" />
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedKeys = ref(["1"]);

const clickToIndex = () => {
  router.push("/home/index");
};
const clickToLog = () => {
  router.push("/home/log");
};
</script>
<style lang="less" scoped>
.layout {
  min-height: 100vh;
}

.layout-content {
  padding: 0 50px;
  margin-top: 32px;
}

.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 0px 60px 0px -24px;

  .logo-image {
    height: 100%;
    object-fit: fill;
  }
}

.ant-row-rtl .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
