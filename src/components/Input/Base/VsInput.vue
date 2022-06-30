<template>
  <div class="vs-input-parent" :style="parentStyle" :class="parrentClass">

    <!-- Input content -->
    <div class="vs-input-content" :class="inputClass">

      <!-- Input -->
      <!-- Todo: Emit value -->
      <input
          :id="getId"
          class="vs-input"
          :value="value"
          :class="{
            'vs-input--has-icon': $slots['icon'],
            'vs-input--has-icon--after': iconAfter
          }"
          :type="visiblePassword ? 'text' : $attrs.type"
          @change="emit('update:value', $event.target.value)"
      />

      <!-- label -->
      <label
          :for="getId"
          class="vs-input__label"
          :class="{
            'vs-input__label--hidden': value || $attrs.type === 'date' || $attrs.type === 'time',
            'vs-input__label--label': label,
            'vs-input__label--placeholder': labelPlaceholder
          }"
      >
        {{ label || $attrs.placeholder || labelPlaceholder }}
      </label>

      <!-- Slot Icon, Todo: Add emit -->
      <span
          v-if="$slots['icon']"
          class="vs-input__icon"
          :class="{
            'vs-input__icon--after': iconAfter
          }"
          @click="emit('click-icon')"
      >
        <slot name="icon" />
      </span>

      <!-- Loading -->
      <div v-if="loading" class="vs-input__loading"></div>

      <!-- Effect -->
      <div class="vs-input__affects">
        <div class="vs-input__affects__1" />
        <div class="vs-input__affects__2" />
        <div class="vs-input__affects__3" />
        <div class="vs-input__affects__4" />

      </div>

    </div>

    <!-- Process -->
    <div v-if="progress > 0" class="vs-input__progress">
      <div class="vs-input__progress__bar" :style="{ width: `${this.progress}%` }"></div>
    </div>

    <!-- Message success -->
    <!-- Message -->
    <Transition
        v-if="$slots['success']"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
      <div class="vs-input__message vs-input__message--success">
        <slot name="success"></slot>
      </div>
    </Transition>

    <Transition
        v-if="$slots['danger']"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
      <div class="vs-input__message vs-input__message--danger">
        <slot name="danger"></slot>
      </div>
    </Transition>

    <Transition
        v-if="$slots['warn']"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
      <div class="vs-input__message vs-input__message--warn">
        <slot name="warn"></slot>
      </div>
    </Transition>

    <Transition
        v-if="$slots['primary']"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
      <div class="vs-input__message vs-input__message--primary">
        <slot name="primary"></slot>
      </div>
    </Transition>

  </div>
</template>

<script lang="ts" setup>
import {computed, ref, useAttrs} from "vue"
import {VsProps} from "@util/types/global";
import {getColor} from "@util/index";

interface VsInputProps extends VsProps{
  value?: string;
  labelPlaceholder?: string;
  label?: string;

  block?: boolean;
  iconAfter?: boolean;
  visiblePassword?: boolean;
  loading?: boolean;
  color?: string;
  state?: string;
  progress?: number;
  border?: boolean;
  shadow?: boolean;
  transparent?: boolean;
  textWhite?: boolean;
  square?: boolean;
}

// Emit events
const emit = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'click-icon'): void
}>()

const props = withDefaults(defineProps<VsInputProps>(), {
  value: '',
  labelPlaceholder: '',
  label: '',

  progress: 0
})

const isVisiblePassword = ref<boolean>(false)

const attrs = useAttrs()
const getId = ref(`vs-input--${attrs.id || Math.round(Math.random() * 100)}`)

const hasColor = computed(() =>  props.color || props.primary || props.danger || props.success || props.dark || props.warn)

// Transition
const onBeforeEnter = (el: any) => {
  el.style.height = 0
}

const onEnter = (el: any, done: any) => {
  let h = el.scrollHeight
  el.style.height = h - 1 + 'px'
  done()
}

const onLeave = (el: any, done: any) => {
  el.style.minHeight = '0px'
  el.style.height = '0px'
}

// Parent
const parentStyle = computed(() => ({
  '--vs-color': getColor(props.color)
}))
const parrentClass = computed(() => ([
  `vs-input-parent--state-${props.state}`,
  { 'vs-input-parent--border': !!props.border },
  { 'vs-input-parent--shadow': !!props.shadow },
  { [`vs-input-content--has-label`]: props.label || props.labelPlaceholder },
  { block: props.block },
  { transparent: props.transparent },
  { textWhite: props.textWhite },
  { square: props.square },

  // colors
  { [`vs-component--primary`] : !props.danger && !props.success && !props.warn && !props.dark && !props.color },
  { [`vs-component--danger`] : !!props.danger },
  { [`vs-component--warn`] : !!props.warn },
  { [`vs-component--success`] : !!props.success },
  { [`vs-component--dark`] : !!props.dark },
  /*{ [`vs-component--is-color`] : !!isColor },*/
]))

// Input content
const inputClass = computed(() => ([
  {
    'vs-input-content--has-color': hasColor.value
  },
  {
    'vs-input-content--has-label': props.label || props.labelPlaceholder
  }
]))

// Progress
const progressClass = computed(() => ([
  { 'vs-input__progress--danger': props.progress < 33 },
  { 'vs-input__progress--warn': props.progress < 66 && props.progress > 33 },
  { 'vs-input__progress--success': props.progress > 66 }
]))

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "VsInput"
})
</script>

<style lang="sass" src="./style.sass" />
