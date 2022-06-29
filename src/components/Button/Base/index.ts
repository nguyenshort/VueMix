import type {App} from "vue"

import component from './VsButton'
import './_button.sass'

const plugin = {
    install(app: App) {
        app.component('vs-button', component)
    }
}

export default plugin
