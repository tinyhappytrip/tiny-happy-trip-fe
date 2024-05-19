import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import VueFullPage from 'vue-fullpage.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import Swal from 'sweetalert2'

export function registerPlugins(app) {
  app.use(vuetify).use(router).use(pinia).use(VueFullPage)
  app.provide('$swal', Swal)
}
