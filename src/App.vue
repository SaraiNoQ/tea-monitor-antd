<template>
  <div>
    <div id="app">
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import { logLabeled } from "./utils/logger";

logLabeled("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*", "log", "", "color: #66ccff");
</script>

<style lang="less" scoped>
#app {
  width: 100vw;
}
</style>
