import VsButton from '../../../components/Button/Base/VsButton';

import '../../../styles/_index.sass'
import '../../../components/Button/Base/_button.sass'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Vuesax/Button',
    component: VsButton,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        color: {
            name: 'Màu',
            control: {type: 'select'},
            options: ['', 'primary', 'success', 'dark', 'warn'],
            default: 'primary'
        },
        size: {
            name: 'Kích Cỡ',
            control: {type: 'select'},
            options: ['xl', 'large', 'default', 'small', 'mini'],
        }
    },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: {VsButton},
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        return {args};
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `
      <div>
      <vs-button v-bind="args" active>Active</vs-button>
      <vs-button v-bind="args">Default</vs-button>
      <vs-button v-bind="args" disabled>Disabled</vs-button>
      </div>
    `,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
const primaryArgs = {
    color: 'primary',
    ripple: '',
    flat: false,
    primary: true,
    success: false,
    border: false,
    gradient: false,
    relief: false,
    transparent: false,
    shadow: false,
    floating: false,
    activeDisabled: false,
    block: false,
    circle: false,
    square: false,
    loading: false,
    upload: false,

    animationType: '',
    animateInactive: false,
}

Primary.args = primaryArgs;
