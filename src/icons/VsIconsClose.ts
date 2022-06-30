import {defineComponent, h, VNode} from 'vue'
import './icons.sass'
export default defineComponent({
  name: 'VsIconClose',
  props: {
    hover: { type: String, default: null }
  },
  render(): VNode {
    return h('i', {
      class: [
        'vs-icon-plus',
        `vs-icon-hover-${this.hover}`
      ],
      ref: 'icon',
      artts: {
        ...this.$attrs
      }
    })
  }
})
