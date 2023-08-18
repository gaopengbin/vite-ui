<script setup lang="ts">
import { testFunc } from 'lib'
</script>

<template>
  <header>
    <lg-test />
  </header>
  <main>
    <lg-earth />
  </main>
</template>

<style scoped>
header {
  height: 100px;
  background-color: #000;
}
main {
  height: calc(100vh - 100px);
  width: 100vw;
}
</style>
