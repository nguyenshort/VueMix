import {defineComponent, h, PropType} from "vue";
import mixins from "../../../util/mixins";
import ripple, {rippleCut, rippleReverse} from "../../../util/ripple";
import {UISize} from "../../../util/types/size";

export default defineComponent({
    name: 'VsButton',
    mixins: [mixins],
    props: {
        ripple: {
            type: String,
            default: '',
        },
        flat: {
            type: Boolean,
            default: false,
        },
        border: {
            type: Boolean,
            default: false,
        },
        gradient: {
            type: Boolean,
            default: false
        },
        relief: {
            type: Boolean,
            default: false
        },
        transparent: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: Boolean,
            default: false
        },
        floating: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Boolean,
            default: false
        },
        activeDisabled: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        circle: {
            type: Boolean,
            default: false,
        },
        square: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<UISize>,
            default: 'default',
        },
        loading: {
            type: Boolean,
            default: false,
        },
        upload: {
            type: Boolean,
            default: false,
        },

        animationType: {
            type: String,
            default: '',
        },
        animateInactive: {
            type: Boolean,
            default: false
        }
    },
    render() {

        const defaultSlot = this.$slots.default ? h('div', {
            class: ['vs-button__content']
        }, this.$slots.default()) : []

        const animateSlot = h('div', {
            class: [
                `vs-button__animate`,
                `vs-button__animate--${this.animationType}`
            ]
        }, this.$slots.animate )

        const loadingElement = h('div', {
            class: ['vs-button__loading']
        })

        return  h('button', {
            style: {
                ['--vs-color']: this.color ? this.getColor : ''
            },
            class: [
                `vs-button`,
                // `vs-button--${this.color.replace('#', '')}`,
                { [`vs-button--${this.componentColor}`] : this.componentColor },
                { [`vs-button--fff`] : this.color === '#fff' },
                { [`vs-button--size-${this.size}`] : this.size },
                { [`vs-button--active`] : this.active },
                { [`vs-button--active-disabled`] : this.activeDisabled },
                { [`vs-button--circle`] : this.circle },
                { [`vs-button--square`] : this.square },
                { [`vs-button--icon`] : this.icon },
                { [`vs-button--loading`] : this.loading },
                { [`vs-button--upload`] : this.upload },
                { [`vs-button--block`] : this.block },
                { [`vs-button--animate`] : this.$slots.animate },
                { [`vs-button--animate-${this.animationType}`] : this.animationType },
                { [`vs-button--animate-inactive`] : this.animateInactive },

                // colors
                { [`vs-button--primary`] : !this.danger && !this.success && !this.warn && !this.dark && !this.color },
                { [`vs-button--danger`] : this.danger },
                { [`vs-button--warn`] : this.warn },
                { [`vs-button--success`] : this.success },
                { [`vs-button--dark`] : this.dark },

                { [`vs-button--default`] :
                    !this.flat &&
                    !this.border &&
                    !this.gradient &&
                    !this.relief &&
                    !this.transparent &&
                    !this.shadow &&
                    !this.floating
                },
                { [`vs-button--flat`] : this.flat },
                { [`vs-button--border`] : this.border },
                { [`vs-button--gradient`] : this.gradient },
                { [`vs-button--relief`] : this.relief },
                { [`vs-button--transparent`] : this.transparent },
                { [`vs-button--shadow`] : this.shadow },
                { [`vs-button--floating`] : this.floating },
            ],
            onmousedown: (evt: EventTarget) => {
                if (this.ripple === 'reverse') {
                    rippleReverse(evt)
                } else if (this.ripple === 'cut') {
                    rippleCut(evt)
                } else {
                    if (this.flat) {
                        ripple(
                            evt,
                            (this.componentColor || this.color || 'primary') &&
                            !this.active &&
                            document.activeElement !== this.$el ? 'inherit' :
                                null,
                            this.flat && !this.active && document.activeElement !== this.$el
                        )
                    } else {
                        ripple(
                            evt,
                            null,
                            false
                        )
                    }
                }
            }
        }, [ defaultSlot, this.$slots.animate ? animateSlot : null , this.loading ? loadingElement : null ] )

    }
})
