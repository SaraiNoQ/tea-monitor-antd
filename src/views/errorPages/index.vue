<template>
  <div class="err">
    <div class="content">
      Error{{ errorCode }}
      <a-button @click="back">back</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const errorCode = ref<number>(404);
const back = () => {
  router.push({ path: "/home/index" });
};
</script>

<style scoped lang="less">
.err {
  width: 100vw;
  height: 100vh;
  .content {
    margin: 0 auto;
    width: fit-content;
  }
}
</style>
