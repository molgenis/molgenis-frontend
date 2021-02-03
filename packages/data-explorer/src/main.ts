import Vue from 'vue'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { BootstrapVue } from 'bootstrap-vue'

// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
// @ts-ignore
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
// @ts-ignore
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
// @ts-ignore
import draggable from 'vuedraggable'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@molgenis-ui/components-library/dist/components-library.css'

import { faCaretRight,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faCog,
  faEdit,
  faExclamationTriangle,
  faMinus,
  faPlay,
  faPlus,
  faPlusSquare,
  faShoppingBag,
  faShoppingCart,
  faSlidersH,
  faSpinner,
  faSearch,
  faStore,
  faTh,
  faThList,
  faTimes,
  faTrash,
  faUpload,
  faShare,
  faSort,
  faSortAlphaUp,
  faSortAlphaDown
} from '@fortawesome/free-solid-svg-icons'

library.add(faCaretRight, faChevronLeft, faChevronRight, faChevronUp, faCog, faEdit, faExclamationTriangle,
  faMinus, faPlay, faPlus, faPlusSquare, faShoppingBag, faSlidersH, faShoppingCart, faSpinner,
  faSearch, faStore, faTh, faThList, faTimes, faTrash, faUpload, faSort, faSortAlphaUp, faSortAlphaDown, faShare
)

Vue.use(BootstrapVue)
Vue.component('draggable', draggable)
Vue.component('DateRangePicker', DateRangePicker)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('VueSlider', VueSlider)

Vue.config.productionTip = false

// Setup event bus for n-level deep child -> parent events
// This way the mainView can coordinate the events
Vue.prototype.$eventBus = new Vue()

Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: ['dataexplorer'],
  callback () {
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
