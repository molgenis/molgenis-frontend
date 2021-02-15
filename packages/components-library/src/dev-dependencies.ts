// Third-party development dependencies for tests and sandbox apps.
// Apps using the components-library have to import these depencencies
// manually. See README.md for more information.

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretRight,
  faExclamationCircle,
  faSpinner,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
import DateRangePicker from 'vue2-daterange-picker'
import VueSlider from 'vue-slider-component'
// @ts-ignore
import draggable from 'vuedraggable'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'vue-slider-component/theme/default.css'

export default function (BootstrapVue: any, Vue: any) {
  library.add(
    faCaretRight,
    faExclamationCircle,
    faSpinner,
    faTimes
  )

  Vue.use(BootstrapVue)
  Vue.component('FontAwesomeIcon', FontAwesomeIcon)
  Vue.component('DateRangePicker', DateRangePicker)
  Vue.component('VueSlider', VueSlider)
  Vue.component('draggable', draggable)

  return Vue
}
