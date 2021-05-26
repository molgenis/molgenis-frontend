import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import { filters, fruitOptionsFunction, multiFilterOptions } from './tests/lib/mocks'
import devDependencies from '@/dev-dependencies'

devDependencies(BootstrapVue, Vue)

Vue.mixin({
  methods: {
    $t(key) {
      return key // Mock i18n within the components-library
    }
  },
  data () {
    return {
      fruitOptionsFunction,
      filtersMocks: filters, // rename to avoid conflict with local prop,
      multiFilterOptions
    }
  }
})
