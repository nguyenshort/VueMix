<template>
  <Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
  >
    <div :class="containerClass">

      <!-- icon Slot -->
      <div v-if="$slots['icon']" class="vs-alert__icon" ref="iconRef">
        <slot/>
      </div>

      <!-- Slot title -->
      <div
          v-if="$slots['title']"
          class="vs-alert__title"
          :class="{
             'vs-alert__title--clickHidden': typeof hiddenContent === 'boolean'
          }"
      >
        <slot name="title"/>

        <vs-icon-plus
            v-if="!closable && typeof hiddenContent === 'boolean'"
            :less="!hiddenContent"
            @click="handleClickHidden"
        />

      </div>

      <!-- Content Slot -->
      <Transition
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @leave="onLeave"
      >
        <div ref="contentRef" class="vs-alert__content" v-if="!hiddenContent">
          <div class="vs-alert__content__text">
            <slot></slot>
          </div>
        </div>
      </Transition>

      <!-- Close Button -->
      <button v-if="closable" class="vs-alert__close">
        <vs-icon-close @click="closable"/>
      </button>

      <!-- Fotter -->
      <div v-if="$slots['footer']" class="vs-alert__footer">
        <slot name="footer"/>
      </div>

    </div>
  </Transition>
</template>

<script lang="ts" setup>

import {computed} from "vue";
import VsIconPlus from "../../../icons/VsIconsPlus";
import VsIconClose from "../../../icons/VsIconsClose";

const props = withDefaults(defineProps<{
  color?: string
  danger?: boolean
  success?: boolean
  warn?: boolean
  dark?: boolean
  primary?: boolean
  active?: boolean

  solid?: boolean
  border?: boolean
  shadow?: boolean
  gradient?: boolean
  flat?: boolean
  relief?: boolean
  value?: any
  hiddenContent?: any
  closable?: boolean
  progress?: number
  page?: number
}>(), {
  value: true,
  hiddenContent: true,
  progress: 0,
  page: 0
})

// Emit events
const emit = defineEmits<{
  (e: 'update:hiddenContent', value: any): void
}>()

const containerClass = computed(() => ([
  `vs-alert`,
  {[`vs-alert--solid`]: props.solid},
  {[`vs-alert--border`]: props.border},
  {[`vs-alert--shadow`]: props.shadow},
  {[`vs-alert--gradient`]: props.gradient},
  {[`vs-alert--flat`]: props.flat},
  {[`vs-alert--relief`]: props.relief},
  /*{[`vs-alert--pages`]: getPages.length > 0},*/

  // colors
  {[`vs-component--primary`]: !props.danger && !props.success && !props.warn && !props.dark && !props.color},
  {[`vs-component--danger`]: props.danger},
  {[`vs-component--warn`]: props.warn},
  {[`vs-component--success`]: props.success},
  {[`vs-component--dark`]: props.dark},
]))

// Toggle Button
const handleClickHidden = () => {
  emit('update:hiddenContent', !props.hiddenContent)
}

// Transion
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

</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "VsAlert"
})
</script>

<style lang="sass">
@import 'style'
</style>
