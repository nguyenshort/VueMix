<template>
  <Transition name="loading">
    <div class="vs-loading" :class="elClass">
      <div class="vs-loading__load" :style="loadinStyle">

        <div class="vs-loading__load__animation">

          <div class="vs-loading__load__percent">{{ percent }}</div>
          <div class="vs-loading__load__animation__1" />
          <div class="vs-loading__load__animation__2" />
          <div class="vs-loading__load__animation__3" />

        </div>

        <div class="vs-loading__load__text">
          {{ text }}
        </div>

      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import {computed, defineProps, nextTick, ref, watch} from "vue";
import {setColor, setVar} from "@util/index";

const props = withDefaults(defineProps<{
  text?: string
  type?: 'default' |'waves' | 'corners' | 'border' | 'points' | 'square' | 'gradient' | 'rectangle' | 'circles' | 'square-rotate' | 'scale'
  color?: string
  background?: string
  opacity?: string
  percent?: string
  progress?: string
  scale?: string
  target?: any
  isVisible: boolean
}>(), {
  isVisible: true
})

const el = ref<HTMLDivElement>()

watch(() => props.isVisible, () => {
  nextTick(() => {
    setColor('color', props.color as string, el.value)
    setColor('background', props.background as string, el.value)
    if(props.opacity) {
      setVar('opacity', props.opacity, el.value)
    }
  })
})

const elClass = computed(() => ([
  `vs-loading--${props.type || 'default'}`,
  { 'vs-loading--target': !!props.target },
  { 'vs-loading--background': !!props.background }
]))

const loadinStyle = computed(() => ({
  transform: `scale(${props.scale})`
}))

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "VsLoading"
})
</script>

<style scoped lang="sass">
@import "./style.sass"
</style>
