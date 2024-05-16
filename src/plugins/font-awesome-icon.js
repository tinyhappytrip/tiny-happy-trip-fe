import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquarePlus, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faSquarePlus, faPaperPlane, faMagnifyingGlass)

export function fontAwesomeIcon(app) {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
