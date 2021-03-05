import Vue from 'vue'
import 'bootstrap'
import App from './App.vue'

import Router from 'vue-router'
import { defaultRouteQuery, routes } from './routes'

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

import {
  faCaretRight,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faCog,
  faEdit,
  faFilter,
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

const packageJson = require('../package.json')

library.add(faCaretRight, faChevronLeft, faChevronRight, faChevronUp, faCog, faEdit, faExclamationTriangle, faFilter,
  faMinus, faPlay, faPlus, faPlusSquare, faShoppingBag, faSlidersH, faShoppingCart, faSpinner,
  faSearch, faStore, faTh, faThList, faTimes, faTrash, faUpload, faSort, faSortAlphaUp, faSortAlphaDown, faShare
)

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.component('draggable', draggable)
Vue.component('DateRangePicker', DateRangePicker)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('VueSlider', VueSlider)

Vue.config.productionTip = false

// Setup event bus for n-level deep child -> parent events
// This way the mainView can coordinate the events
Vue.prototype.$eventBus = new Vue()

const router = new Router({
  base: process.env.NODE_ENV === 'production' ? packageJson.name : process.env.BASE_URL,
  routes
})

// Navigation guard that makes sure that all explorer
// query params are present.
router.beforeEach((to, from, next) => {
  globalThis.defaultRouteQuery = defaultRouteQuery
  globalThis.to = to.query
  if (to.name === 'de-view') {
    const missingQueryParams = Object.keys(defaultRouteQuery).filter((i) => !Object.keys(to.query).includes(i))
    if (missingQueryParams.length) {
      next({ path: `/explorer/${to.params.entity}`, query: defaultRouteQuery })
    } else { next() }
  } else { next() }
})

Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: ['dataexplorer', 'data-row-edit', 'ui-form'],
  callback () {
    new Vue({ store, router, render: h => h(App) }).$mount('#app')
  }
})
