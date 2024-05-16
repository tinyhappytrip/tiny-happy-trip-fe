import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { fontAwesomeIcon } from './plugins/font-awesome-icon'
import '@/styles/reset.css'

const app = createApp(App)
registerPlugins(app)
fontAwesomeIcon(app)
app.mount('#app')
