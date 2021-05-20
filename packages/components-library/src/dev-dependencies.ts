// Third-party development dependencies for tests and sandbox apps.
// Apps using the components-library have to import these depencencies
// manually. See README.md for more information.

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretRight,
  faExclamationCircle,
  faFilter,
  faSpinner,
  faTimes,
  faSort,
  faSortAlphaDown,
  faSortAlphaUp,
  faEdit,
  faSearch,
  faTrash,
  faShare
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
    faFilter,
    faSpinner,
    faTimes,
    faSort,
    faSortAlphaDown,
    faSortAlphaUp,
    faEdit,
    faSearch,
    faTrash,
    faShare
  )

  // Create a eventBus
  Vue.prototype.$eventBus = new Vue()

  Vue.use(BootstrapVue)
  Vue.component('FontAwesomeIcon', FontAwesomeIcon)
  Vue.component('DateRangePicker', DateRangePicker)
  Vue.component('VueSlider', VueSlider)
  Vue.component('draggable', draggable)
  Vue.component('RouterLink', { // Mock a router-link within the components-library
    template: `<a><slot></slot></a>`
  })
  return Vue
}
