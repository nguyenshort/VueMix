<template>

  <div class="vs-switch" :style="elStyle" :class="elClass">
    <input v-bind="$attrs" type="checkbox" :checked="isChecked" class="vs-switch__input" @change="onChangeInput" @blur="onInputBlur" />

    <!-- Circle -->
    <div class="vs-switch__circle">
      <slot name="circle" />
    </div>

    <!-- Text On -->
    <div class="vs-switch__text on">
      <slot name="on">
        <slot />
      </slot>
    </div>

    <!-- Text Off -->
    <div class="vs-switch__text off">
      <slot name="on">
        <slot />
      </slot>
    </div>

    <!-- Background -->
    <div class="vs-switch__background"></div>

  </div>

</template>

<script lang="ts" setup>

import {VsProps} from "@util/types/global";
import {computed} from "vue";
import useDesign from "@composables/useDesign";
import {getColor} from "@util/index";

interface VsSwitchProps extends VsProps {
  color?: string
  danger?: boolean
  success?: boolean
  warn?: boolean
  dark?: boolean
  primary?: boolean
  active?: boolean

  value?: any
  val?: any
  notValue?: any
  loading?: boolean
  square?: boolean
  indeterminate?: boolean
  icon?: string
}

const props = withDefaults(defineProps<VsSwitchProps>(), {
  value: '',
  val: '',
  notValue: ''
})

const emit = defineEmits<{
  (e: 'update:value', value: any): void
  (e: 'mousedown', evt: any): void
  (e: 'blur', evt: EventTarget): void
}>()

const isChecked = computed(() => {
  let isChecked = false

  if (props.value) {

    if (typeof props.value == 'boolean') {
      isChecked = props.value
    } else if (typeof props.value == 'object') {
      const array = props.value
      const containValue = array.indexOf(props.val) === -1 &&
          JSON.stringify(array).indexOf(JSON.stringify(props.val)) === -1
      let indexVal = 0

      array.forEach((item: any, index: number) => {
        if (JSON.stringify(item) == JSON.stringify(props.val)) {
          indexVal = index
        }
      })

      return !containValue;
    }

  } else {
    isChecked = false
  }
  return isChecked
})


const elClass = computed(() => ([
  {
    'vs-switch--loading': props.loading,
    'vs-switch--square': props.square,
    'vs-switch--indeterminate': props.indeterminate,
    'vs-switch--icon': props.icon,
  },
  ...useDesign(props),
]))

const elStyle = computed(() => ({
  '--vs-color': getColor(props.color),
}))

const onChangeInput = (evt: Event) => {
  if(typeof props.value === 'boolean') {
    return emit('update:value', !props.value)
  } else if (typeof props.value == 'object' && props.value !== null) {
    const array = props.value
    const containValue = array.indexOf(props.val) === -1 &&
        JSON.stringify(array).indexOf(JSON.stringify(props.val)) === -1
    let indexVal = 0

    array.forEach((item: any, index: number) => {
      if(JSON.stringify(item) == JSON.stringify(props.val)) {
        indexVal = index
      }
    })

    if (containValue) {
      array.push(props.val)
    } else {
      array.splice(indexVal, 1)
    }

    emit('update:value', array)
  } else {

    if (props.val !== props.value) {
      emit('update:value', props.val)
    } else {
      emit('update:value', props.notValue || null)
    }
  }
  emit('mousedown', evt)
}

const onInputBlur = (evt: EventTarget) => {
  emit('blur', evt)
}

</script>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "VsSwitch"
})
</script>

<style lang="sass" src="./style.sass"></style>
