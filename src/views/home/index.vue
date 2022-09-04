<template>
  <div class="home">
    <HomeLayout>
      <template #breadcrumb>
        <a-breadcrumb style="margin: -16px 0 16px 0">
          <a-breadcrumb-item v-for="(item, index) in routerPath.matched" :key="index">
            <router-link v-if="item.name !== '首页'" :to="item.path">{{ item.name }}</router-link>
            <span v-else>{{ item.name }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </template>
      <template #footer>
        <Footer />
      </template>
    </HomeLayout>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import { useRouter } from "vue-router";
import HomeLayout from "~/layout/home.vue";
import Footer from "~/components/layout/Footer/index.vue";

const routes = useRouter();
const routerPath = computed(() => routes.currentRoute.value);
watch(
  () => routerPath.value,
  () => {
    // console.log("route", routerPath.value.matched);
  }
);
</script>
<style scoped></style>
<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
}
</style>
