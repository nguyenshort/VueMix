import { createApp } from 'vue'
import App from './App.vue'
import vmButton from "./components/Button"

import './styles/_index.sass'

const app = createApp(App)

    app.use(vmButton)

    app.mount('#app')
