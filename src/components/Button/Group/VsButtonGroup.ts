import {defineComponent, h} from "vue";

export default defineComponent({
    name: "VsButtonGroup",
    render() {
        return h('div', {
            class: 'vs-button-group'
        }, [this.$slots.default ? this.$slots.default() : null]);
    }
})
