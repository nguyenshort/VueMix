import {defineComponent, h, PropType, VNode, Transition} from "vue"

import mixins from "../../../util/mixins"
import VsIconsPlus from "../../../icons/VsIconsPlus";
import VsIconsClose from "../../../icons/VsIconsClose";

export default defineComponent({
    name: "VsAlert",
    mixins: [mixins],
    props: {
        solid: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: Boolean,
            default: false
        },
        gradient: {
            type: Boolean,
            default: false
        },
        flat: {
            type: Boolean,
            default: false
        },
        relief: {
            type: Boolean,
            default: false
        },
        value: {
            type: undefined,
            default: true
        },
        hiddenContent: {
            type: [Boolean, null] as PropType<Boolean | null>,
            default: () => true
        },
        closable: {
            type: Boolean,
            default: false
        },
        progress: {
            type: [Number, String] as PropType<Number | String>,
            default: 0
        },
        page: {
            type: [Number, String] as PropType<Number | String>,
            default: 0
        }
    },
    slots: [
        'title'
    ],
    computed: {
        getTotalPages() {
            const keys = Object.keys(this.$slots).filter((item) => {
                return item.indexOf('page') !== -1
            })
            return keys.length
        },

        getPages() {
            const keys = Object.keys(this.$slots).filter((item) => {
                return item.indexOf('page') !== -1
            })

            const values: any = []

            keys.forEach((item) => {
                values.push(this.page == item.split('-')[1] && this.$slots[item])
            })
            return values
        }
    },
    watch: {
        hiddenContent(val: boolean) {
            if (!this.value) {
                return
            }
            const el = (this.$el as HTMLElement)
            const content = (this.$refs.content as HTMLElement)
            if (!val) {
                el.style.height = 'auto'
                setTimeout(() => {
                    el.style.height = this.$el.scrollHeight - 1 + 'px'
                }, 250)
            } else {
                el.style.height = this.$el.scrollHeight - content.scrollHeight + 'px'
            }
        },
        page() {
            const content = this.$refs.content as HTMLElement
            content.style.minHeight = content.scrollHeight + 'px'

            this.$nextTick(() => {
                const el = (this.$el as HTMLElement)
                el.style.height = this.$el.scrollHeight - 1 + 'px'
            })
        }
    },
    mounted() {
        if (this.$el && this.$refs.content) {
            const el = (this.$el as HTMLElement)
            el.style.height = this.$el.scrollHeight - 1 + 'px'

            const content = this.$refs.content as HTMLElement
            content.style.minHeight = content.scrollHeight + 'px'
        }
    },
    methods: {
        beforeEnter(el: any) {
            el.style.height = 0
        },

        enter(el: any, done: any) {
            let h = el.scrollHeight
            el.style.height = h - 1 + 'px'
            done()
        },

        leave(el: any, done: any) {
            el.style.minHeight = '0px'
            el.style.height = '0px'
        },

        handleClickClose() {
            this.$emit('input', !this.value)
        },

        handleClickHidden() {
            this.$emit('update:hiddenContent', !this.hiddenContent)
        },

        handleClickPrevPage() {
            if (this.page > 1) {
                this.$emit('update:page', Number(this.page) - 1)
            }
        },

        handleClickNextPage() {
            if (this.page < this.getTotalPages) {
                this.$emit('update:page', Number(this.page) + 1)
            }
        }
    },

    render(): VNode {

        const icon = this.$slots.icon ? h('div', {
            class: 'vs-alert__icon',
            ref: 'icon'
        }, this.$slots.icon()) : []

        const contentText = h('div', {
            class: 'vs-alert__content__text',
            ref: 'text'
        }, [
            this.$slots.default ? this.$slots.default() : '',
            ...this.getPages
        ])

        const content = h(Transition, {
            onBeforeEnter: this.beforeEnter,
            onEnter: this.enter,
            onLeave: this.leave
        },
            () => [
                !this.hiddenContent
                && h('div', { class: 'vs-alert__content', ref: 'content'},
                    [contentText])
            ]
        )

        const title = h('div', {
            class: [
                { 'vs-alert__title--clickHidden': typeof this.hiddenContent === 'boolean' },
                'vs-alert__title'
            ],
            onClick: this.handleClickHidden
        }, [
            this.$slots.title ? this.$slots.title() : '',
            !this.closable && typeof this.hiddenContent === 'boolean' && h(VsIconsPlus, {
                less: !this.hiddenContent,
                onClick: this.handleClickHidden
            })
        ])

        const closeBtn = h('button', {
            class: [
               `vs-alert__close`
            ],
            onClick: this.handleClickClose
        }, [
            h(VsIconsClose, {
                props: {
                    hover: 'less'
                }
            })
        ])

        const pagination = h('div', {
            class: [
                'vs-alert__pagination'
            ]
        }, [
            h('button', {
                on: {
                    click: this.handleClickPrevPage
                }
            }, '<'),
            h('span', `${this.page} / ${this.getTotalPages}`),
            h('button', {
                on: {
                    click: this.handleClickNextPage
                }
            }, '>')
        ])

        const footer = h('div', {
            class: 'vs-alert__footer',
        }, this.$slots.footer ? this.$slots.footer() : '')

        const progress = h('div', {
            class: 'vs-alert__progress',
        }, [
            h('div', {
                class: ['vs-alert__progress__bar'],
                style: {
                    width: `${this.progress}%`
                }
            })
        ])

        const render = h('div', {
            style: {
                ['--vs-color']: this.color ? this.getColor : ''
            },
            class: [
                `vs-alert`,
                {[`vs-alert--solid`]: !!this.solid},
                {[`vs-alert--border`]: !!this.border},
                {[`vs-alert--shadow`]: !!this.shadow},
                {[`vs-alert--gradient`]: !!this.gradient},
                {[`vs-alert--flat`]: !!this.flat},
                {[`vs-alert--relief`]: !!this.relief},
                {[`vs-alert--pages`]: this.getPages.length > 0},

                // colors
                {[`vs-component--primary`]: !this.danger && !this.success && !this.warn && !this.dark && !this.color},
                {[`vs-component--danger`]: !!this.danger},
                {[`vs-component--warn`]: !!this.warn},
                {[`vs-component--success`]: !!this.success},
                {[`vs-component--dark`]: !!this.dark},
            ],
        }, [
            this.$slots.icon && icon,
            this.$slots.title && title,
            content,
            this.closable && closeBtn,
            this.$slots.footer && footer,
            !!this.progress && progress,
            this.getTotalPages > 0 && pagination
        ])

        return h(Transition, {
            onBeforeEnter: this.beforeEnter,
            onEnter: this.enter,
            onLeave: this.leave
        }, () => [this.value && render])
    }
})
