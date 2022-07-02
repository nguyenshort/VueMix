<template>
  <div class="vs-checkbox-content" :class="checkBoxClass" :style="checkBoxStyle">

    <div class="vs-checkbox-con">
      <!-- InputCheckbox -->
      <input
          :id="getId"
          class="vs-checkbox"
          type="checkbox"
          :checked="checkedForce || isChecked"
          v-bind="attrs"
          @change="onChangeInput"
          @blur="onInputBlur"
      />

      <!-- Checkbook -->
      <div class="vs-checkbox-mask">

        <slot name="icon">
          <vs-icon-check :indeterminate="indeterminate" />
        </slot>

      </div>

    </div>

    <!-- Label -->
    <label
        :id="getId"
        class="vs-checkbox-label"
        :class="{
            lineThrough: lineThrough
          }"
    >
      <slot />
    </label>

  </div>
</template>

<script lang="ts" setup>

import {VsProps} from "@util/types/global";
import {computed, onMounted, ref, useAttrs, watch} from "vue";
import {getColor} from "@util/index";
import VsIconCheck from "@icons/VsIconCheck.vue";
import useDesign from "@composables/useDesign";

interface VsCheckBoxProps extends VsProps {
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
  indeterminate?: boolean
  lineThrough?: boolean
  checked?: boolean
  checkedForce?: boolean
  loading?: boolean
  labelBefore?: boolean
}

const props = withDefaults(defineProps<VsCheckBoxProps>(), {
  value: '',
  val: '',
  notValue: '',
})

const getId = ref('checkbox-' + Math.round(Math.random() * 100000));
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
        if(JSON.stringify(item) == JSON.stringify(props.val)) {
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

const emit = defineEmits<{
  (e: 'update:value', value: any): void
  (e: 'mousedown', evt: any): void
  (e: 'blur', evt: EventTarget): void
}>()

watch(() => props.indeterminate, (value) => {
  emit('update:value', !!value)
})
onMounted(() => {
  if (props.checked && typeof props.value == 'boolean') {
    emit('update:value', true)
  }
})

// Checkbox class
const attrs = useAttrs()

const checkBoxClass = computed(() => ([
  { 'vs-checkbox--checked': isChecked.value },
  { 'vs-checkbox--disabled': attrs.hasOwnProperty('disabled') },
  { 'vs-checkbox--loading': props.loading },
  { 'vs-checkbox--label-before': props.labelBefore },

  // colors
    ...useDesign(props)
]))

const checkBoxStyle = computed(() => ({
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
import {defineComponent} from "vue";

export default defineComponent({
  name: "VsCheckbox"
})
</script>

<style lang="sass" src="./style.sass"></style>
