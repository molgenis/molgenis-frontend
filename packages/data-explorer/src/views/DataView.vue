<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <clipboard-view v-if="showShoppingCart"></clipboard-view>
        <div v-else>
          <div class="row">
            <div class="col">
              <active-filters
                @input="saveFilterState"
                :value="activeFilterSelections"
                :filters="filterDefinitions"
              ></active-filters>
            </div>
          </div>
          <select-layout-view ></select-layout-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SelectLayoutView from './SelectLayoutView'
import { mapState, mapActions, mapMutations } from 'vuex'
import ClipboardView from './ClipboardView'
import ActiveFilters from '../../node_modules/@molgenis/molgenis-ui-filter/src/components/ActiveFilters.vue'

export default Vue.extend({
  name: 'DataView',
  components: { SelectLayoutView, ClipboardView, ActiveFilters },
  computed: {
    ...mapState([
      'showShoppingCart',
      'tableName',
      'tableMeta',
      'tableSettings',
      'searchText',
      'filters'
    ]),
    searchText: {
      get () {
        return this.$store.state.searchText
      },
      set (value) {
        this.$store.commit('setSearchText', value)
      }
    },
    activeFilterSelections: (vm) => {
      return vm.searchText ? { ...vm.filters.selections, _search: vm.searchText } : vm.filters.selections
    },
    filterDefinitions: (vm) => {
      const searchDef = {
        type: 'string',
        label: 'search',
        name: '_search'
      }
      return vm.searchText ? [ ...vm.filters.definition, searchDef ] : vm.filters.definition
    }
  },
  methods: {
    ...mapActions(['getTableSettings']),
    ...mapMutations([
      'setFilterSelection',
      'setSearchText'
    ]),
    saveFilterState (newSelections) {
      if (newSelections['_search'] === undefined) {
        this.setSearchText('')
      }
      this.setFilterSelection(newSelections)
    }
  },
  created () {
    this.getTableSettings({ tableName: this.tableName })
  }
})
</script>
