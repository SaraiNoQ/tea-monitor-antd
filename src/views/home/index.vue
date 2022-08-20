<template>
  <div class="home">
    <HomeLayout>
      <template #footer>
        <Footer />
      </template>
    </HomeLayout>
  </div>
</template>

<script setup lang="ts">
import HomeLayout from "~/layout/home.vue";
import Footer from "~/components/layout/Footer/index.vue";
</script>
<style scoped></style>
<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
}
</style>
