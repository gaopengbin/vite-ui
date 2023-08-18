<template>
  <div class="test-div">test</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import './index.scss'
export default defineComponent({
  name: 'lg-test',
  components: {},
  props: {},
  emits: {},
  setup(props, ctx) {
    const earth = inject('earth')
    console.log(earth)
    return {}
  }
})
</script>
