import {createApp} from 'vue'
import App from './App.vue'
import vmButton from "./components/Button/Base"
import vmButtonGroup from "./components/Button/Group"

import './styles/_index.sass'

const app = createApp(App)

app.use(vmButton)
app.use(vmButtonGroup)

app.mount('#app')
