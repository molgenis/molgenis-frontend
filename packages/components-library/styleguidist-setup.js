import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import { filters, fruitOptionsFunction, multiFilterOptions } from './tests/demo-data/filterMocks'

Vue.use(BootstrapVue)

Vue.mixin({
  data () {
    return {
      fruitOptionsFunction,
      filtersMocks: filters, // rename to avoid conflict with local prop,
      multiFilterOptions
    }
  }
})
