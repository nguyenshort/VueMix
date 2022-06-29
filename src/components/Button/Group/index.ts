import {App} from "vue"

import component from './VsButtonGroup'
import './_style.sass'

export default {
    install(app: App) {
        app.component('vs-button-group', component);
    }
}
