<template>
  <div id="container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import './index.scss'
export default defineComponent({
  name: 'lg-earth',
  components: {},
  props: {},
  emits: {},
  setup(props, ctx) {
    onMounted(() => {
      const container = document.querySelector('#container')
      const earth = new XE.Earth(container)
    })
    return {}
  }
})
</script>
