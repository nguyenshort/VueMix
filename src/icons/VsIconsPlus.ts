import {defineComponent, h, VNode} from 'vue'
import './icons.sass'

export default defineComponent({
    name: 'VsIconPlus',
    props: {
        less: {type: Boolean, default: false}
    },
    render(): VNode {
        return h('i', {
            class: [
                'vs-icon-plus',
                { less: this.less }
            ],
            ref: 'icon',
            artts: {
                ...this.$attrs
            }
        })
    }
})
