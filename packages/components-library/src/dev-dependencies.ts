// Third-party development dependencies for tests and sandbox apps.
// Apps using the components-library have to import these depencencies
// manually. See README.md for more information.

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretRight,
  faExclamationTriangle,
  faSpinner,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import VueI18n from 'vue-i18n'

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
    faExclamationTriangle,
    faSpinner,
    faTimes
  )

  Vue.use(VueI18n)

  Vue.use(BootstrapVue)
  Vue.component('FontAwesomeIcon', FontAwesomeIcon)
  Vue.component('DateRangePicker', DateRangePicker)
  Vue.component('VueSlider', VueSlider)
  Vue.component('draggable', draggable)

  // This can be molgenis-i18n-js or vue-i18n, as long the i18n library
  // supports the $t('translation') convention. The importance is
  // that all components use i18n tags for texts.
  Vue.mixin({
    i18n: new VueI18n({
      locale: 'nl',
      messages: {}
    })
  })

  return Vue
}
