<template>
  <i
      class="vs-icon-check"
      :class="{
        indeterminate
      }"
  >
    <span>
      <div class="line1"></div>
      <div class="line2"></div>
    </span>
  </i>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'VsIconsCheck',
  props: {
    indeterminate: {type: Boolean, default: false}
  }
})
</script>

<style lang="sass" src="./icons.sass"></style>
