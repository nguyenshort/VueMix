import {computed, defineEmits } from "vue"

export interface IUseToggleProps {
    value: any
    val: any
    notValue: any
}

export default (props: IUseToggleProps) => {

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

    return {
        emit,
        isChecked,
        onChangeInput,
        onInputBlur
    }

}
