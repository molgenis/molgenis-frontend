import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import { filters, fruitOptionsFunction, multiFilterOptions } from './tests/lib/mocks'
import { typeTestMetaData } from './tests/lib/typeTestMetaMock'
import { typeTestData } from './tests/lib/typeTestDataMock'
import devDependencies from '@/dev-dependencies'

devDependencies(BootstrapVue, Vue)

Vue.mixin({
  data () {
    return {
      fruitOptionsFunction,
      filtersMocks: filters, // rename to avoid conflict with local prop,
      multiFilterOptions,
      typeTestMetaData,
      typeTestData
    }
  }
})
