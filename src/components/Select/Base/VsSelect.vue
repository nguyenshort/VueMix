<template>
  <div class="vs-select-content" :class="elClass" :style="elStyle">

    <!-- selectContent -->
    <div
        class="vs-select"
        ref="selectRef"
        :class="{
          [`vs-select--state-${state}`]: state,
          'vs-select--disabled': disabled,
          'activeOptions': activeOptions,
          'loading': loading
        }"
        @mouseleave="onSelectMouseLeave"
        @mouseenter="onSelectMouseEnter"
    >

      <!-- InputSelect -->
      <slot>
        <input
            ref="inputRef"
            class="vs-select__input"
            :id="multiple && _uid"
            :readonly="!filter && true"
            :value="activeFilter ? textFilter : getValueLabel"
            :class="{
            'multiple': multiple,
            'simple': !multiple && !filter,
          }"
            @focus="onInputFocus"
            @keydown="handleKeydown"
            @change="textFilter = $event.target.value"
        >
      </slot>

      <!-- Label -->
      <label
          v-if="!multiple || label"
          class="vs-select__label"
          :for="_uid"
          :class="{
            'vs-select__label--placeholder': labelPlaceholder,
            'vs-select__label--label': label,
            'vs-select__label--hidden': value,
          }"
      >
        {{ labelPlaceholder || label }}
      </label>

      <!-- Label Placeholder -->
      <label
          v-if="!multiple && !labelPlaceholder"
          ref="placeholderRef"
          :for="_uid"
          class="vs-select__label"
          :class="{
            'vs-select__label--hidden': value || textFilter
          }"
      >
        {{ placeholder }}
      </label>

      <!-- Clips -->
      <button
          ref="chipsRef"
          class="vs-select__chips"
          @keydown="handleKeydown"
          @focus="onChipsFocus"
          @blur="blur"
      >
        <!-- List Clips -->
      </button>

    </div>

  </div>
</template>

<script lang="ts" setup>

import {VsProps} from "@util/types/global";
import {computed, nextTick, ref} from "vue";
import {getColor, insertBody, setCords} from "@util/index";
import useDesign from "@composables/useDesign";

interface VsSwitchProps extends VsProps {
  color?: string
  danger?: boolean
  success?: boolean
  warn?: boolean
  dark?: boolean
  primary?: boolean
  active?: boolean

  value?: any
  multiple?: boolean
  filter?: boolean
  placeholder?: string
  labelPlaceholder?: string
  label?: string
  disabled?: boolean
  collapseChips?: boolean
  loading?: boolean
  state?: string
  block?: boolean
}

const props = withDefaults(defineProps<VsSwitchProps>(), {
  placeholder: '',
  labelPlaceholder: '',
  label: '',
})

const renderSelect = ref<boolean>(false)
const activeOptions = ref<boolean>(false)
const valueLabel = ref<any>(null)
const hoverOption = ref<any>(-1)
const uids = ref<any[]>([])
const childOptions = ref<any[]>([])
const targetSelect = ref<boolean>(false)
const targetSelectInput = ref<boolean>(false)
const targetClose = ref<boolean>(false)
const activeFilter = ref<boolean>(false)
const textFilter = ref<string | null>(null)
const childVisibles = ref<number>(0)
const _uid = ref<any>()
const isSelect = ref<boolean>(true)

// El
const elClass = computed(() => ([
  {
    block: props.block
  },
  ...useDesign(props)
]))
const elStyle = computed(() => ({
  '--vs-color': getColor(props.color),
}))

// Refs
const contentRef = ref<HTMLElement>()
const optionsRef = ref<HTMLElement>()
const selectRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const chipsRef = ref<HTMLElement>()
const chipsInputRef = ref<HTMLElement>()

// event emitter
const emit = defineEmits<{
  (e: 'blur'): void
  (e: 'focus', evt: any): void
  (e: 'update:value', data: any): void
}>()

const insertOptions = () => {
  const options = optionsRef.value!
  insertBody(options, document.body)
  setCords(options, selectRef.value)
}

const handleWindowClick = (evt: any) => {
  if (!targetSelectInput.value) {
    handleBlur()
  }
  if (props.filter && !activeOptions.value) {
    activeFilter.value = false
  }
  if (evt.target === inputRef.value && activeOptions.value && !props.filter) {
    handleBlur()
    setTimeout(() => {
      inputRef.value?.blur()
    })
  }
}

const setHover = () => {
  let index: number = -1
  childOptions.value.forEach((item: any, i: number) => {
    if (item.value == props.value) {
      index = i
    }
  })

  hoverOption.value = index
}

const handleBlur = () => {
  nextTick(() => {
    activeOptions.value = false
  })
  emit('blur')
  setHover()
  window.removeEventListener('click', handleWindowClick)
  if (activeOptions.value) {
    textFilter.value = ''
    if (!props.multiple) {
      activeFilter.value = false
    }
  }
}

const clickOption = (value: any, label: any) => {
  if (props.multiple) {
    const oldVal = [...props.value]
    if (oldVal.indexOf(value) == -1) {
      oldVal.push(value)
    } else {
      oldVal.splice(oldVal.indexOf(value), 1)
    }
    emit('update:value', oldVal)
  } else {
    emit('update:value', value)
    valueLabel.value = label
  }

  setTimeout(() => {
    if (props.multiple && activeOptions.value) {
      chipsRef.value?.focus()
    }
  }, 10)
  if (!props.multiple) {
    handleBlur()
  }
}

const getValue = () => {
  const options = childOptions.value

  const filterOptions = options.filter((option: any): boolean => {
    return typeof props.value == 'number' ? props.value == option.value : props.value.indexOf(option.value) !== -1
  })

  const label: any[] = []
  filterOptions.forEach((item: any) => {
    label.push({
      label: (item as any).label,
      value: (item as any).value
    })
  })

  label.sort((a, b) => {
    return props.value.indexOf(a.value) - props.value.indexOf(b.value);
  })

  valueLabel.value = label
}

const getValueLabel = computed(() => {
  let labels: any[] = []
  if (Array.isArray(valueLabel.value)) {
    valueLabel.value.forEach((item: any) => {
      labels.push(item.label)
    })
  } else {
    labels = valueLabel.value
  }
  return labels
})

const getChips = computed(() => {

})


// Select
const onSelectMouseLeave = (evt: any) => {
  if (evt.relatedTarget !== optionsRef.value) {
    targetSelectInput.value = false
    targetSelect.value = false
  }
}

const onSelectMouseEnter = () => {
  targetSelectInput.value = true
}

// Input
const blur = (evt: any) => {
  if (!props.multiple) {
    handleBlur()
  } else {
    if (!evt.relatedTarget) {
      handleBlur()
    } else if (
        !targetSelectInput.value || !targetSelect.value && !activeOptions.value
    ) {
      handleBlur()
    }
  }
  if (props.filter) {
    activeFilter.value = false
  }
}

const handleKeydown = (evt: any) => {
  const options = optionsRef.value
  for (let index = 0; index < 300; index++) {
    setTimeout(() => {
      setCords(options, selectRef.value)
    }, index);
  }
  if (evt.code == 'ArrowDown') {
    evt.preventDefault()
    if (hoverOption.value < childOptions.value.length - 1) {
      hoverOption.value++
    } else {
      hoverOption.value = 0
    }
  } else if (evt.code == 'ArrowUp') {
    evt.preventDefault()
    if (hoverOption.value > 0) {
      hoverOption.value--
    } else {
      hoverOption.value = childOptions.value.length - 1
    }
  } else if (evt.code == 'Enter') {
    evt.preventDefault()
    if (hoverOption.value !== -1) {
      if (!childOptions.value[hoverOption.value].disabled) {
        clickOption(childOptions.value[hoverOption.value].value, childOptions.value[hoverOption.value].label)
        if (!props.multiple) {
          handleBlur();
          inputRef.value?.focus()
        }
      }
    }
  }

  if (hoverOption.value !== -1 && contentRef.value) {
    contentRef.value.scrollTop = childOptions.value[hoverOption.value].$el.offsetTop - 66
  }
}

const onInputFocus = (evt: any) => {
  activeOptions.value = true
  emit('focus', evt)
  if(props.filter) {
    activeFilter.value = true
  }
  window.addEventListener('mousedown', handleWindowClick)
}


// Chips
const onChipsFocus = (evt: any) => {
  if (!targetClose.value) {
    activeOptions.value = true
    emit('focus', evt)
  }
  if (props.filter && props.multiple) {
    chipsInputRef.value?.focus()
  }
}
</script>

<style scoped lang="sass" src="./style.sass"></style>
