import {VsProps} from "@util/types/global";

export default (props: Partial<VsProps>) => {
    return [
        { 'vs-component--primary' : props.primary },
        { 'vs-component--danger' : props.danger },
        { 'vs-component--warn' : props.warn },
        { 'vs-component--success' : props.success },
        { 'vs-component--dark' : props.dark },
    ]
}
