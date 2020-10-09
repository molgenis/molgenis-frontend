import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import { filters, fruitOptionsFunction, multiFilterOptions } from './tests/lib/mocks'

Vue.use(BootstrapVue)

import DateRangePicker from 'vue2-daterange-picker'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSlider from 'vue-slider-component'

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'vue-slider-component/theme/default.css'

Vue.mixin({
  components: {DateRangePicker, FontAwesomeIcon, VueSlider},
  data () {
    return {
      fruitOptionsFunction,
      filtersMocks: filters, // rename to avoid conflict with local prop,
      multiFilterOptions
    }
  }
})
