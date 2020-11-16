// Third-party development dependencies for tests and sandbox apps.
// Apps using the components-library have to import these depencencies
// manually. See README.md for more information.

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretRight,
  faExclamationTriangle,
  faSpinner,
  faTimes,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
import DateRangePicker from 'vue2-daterange-picker'
import VueSlider from 'vue-slider-component'
// @ts-ignore
import draggable from 'vuedraggable'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'vue-slider-component/theme/default.css'
// @ts-ignore
import VueColumnsResizable from 'vue-columns-resizable'
import { VBHoverPlugin } from 'bootstrap-vue'

export default function (BootstrapVue: any, Vue: any) {
  library.add(
    faCaretRight,
    faExclamationTriangle,
    faSpinner,
    faTimes,
    faEye,
    faEyeSlash
  )
  Vue.use(BootstrapVue)
  Vue.use(VueColumnsResizable)
  Vue.use(VBHoverPlugin)
  Vue.component('FontAwesomeIcon', FontAwesomeIcon)
  Vue.component('DateRangePicker', DateRangePicker)
  Vue.component('VueSlider', VueSlider)
  Vue.component('draggable', draggable)

  return Vue
}
