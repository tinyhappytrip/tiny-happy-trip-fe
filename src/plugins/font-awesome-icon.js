import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquarePlus, faPaperPlane, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faRightToBracket, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faSquarePlus, faPaperPlane, faMagnifyingGlass, faRightToBracket, faCircleCheck, faCaretDown, faPlus)

export function fontAwesomeIcon(app) {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
