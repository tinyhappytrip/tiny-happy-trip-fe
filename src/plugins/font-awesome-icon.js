import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquarePlus, faPaperPlane, faCircleCheck, faMessage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMagnifyingGlass,
  faPlay,
  faRightToBracket,
  faCaretDown,
  faPlus,
  faArrowRight,
  faXmark,
  faChevronDown,
  faTrashArrowUp
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faMessage,
  faSquarePlus,
  faPaperPlane,
  faMagnifyingGlass,
  faPlay,
  faRightToBracket,
  faCircleCheck,
  faCaretDown,
  faPlus,
  faArrowRight,
  faXmark,
  faChevronDown,
  faTrashArrowUp
)

export function fontAwesomeIcon(app) {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
