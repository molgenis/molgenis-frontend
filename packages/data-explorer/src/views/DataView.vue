<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <clipboard-view v-if="showSelected"></clipboard-view>
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
    <cart-selection-toast
      v-if="selectedItemIds.length > 0"
      :cartSelectionText="`${selectedItemIds.length} item${selectedItemIds.length==1?'':'s'} selected`"
      :clickHandler="selectionAction"
      title="Selection"
      v-model="handleSelectionItems"
    >
      <template v-slot:removeButton>&times;</template>
      <template v-slot:buttonText>
        Download
      </template>
    </cart-selection-toast>
  </div>
</template>

<script>
import Vue from 'vue'
import SelectLayoutView from './SelectLayoutView'
import ClipboardView from './ClipboardView'
import { mapState, mapMutations } from 'vuex'
import ActiveFilters from '../../node_modules/@molgenis/molgenis-ui-filter/src/components/ActiveFilters.vue'
import { CartSelectionToast } from '@molgenis-ui/components-library'

export default Vue.extend({
  name: 'DataView',
  components: { SelectLayoutView, ClipboardView, ActiveFilters, CartSelectionToast },
  computed: {
    ...mapState([
      'showSelected',
      'tableName',
      'tableMeta',
      'tableSettings',
      'searchText',
      'filters',
      'selectedItemIds'
    ]),
    handleSelectionItems: {
      get () {
        return this.selectedItemIds
      },
      set (value) {
        this.setShoppingItems(value)
      }
    },
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
    ...mapMutations([
      'setFilterSelection',
      'setSearchText',
      'setShoppingItems'
    ]),
    selectionAction () {

    },
    saveFilterState (newSelections) {
      if (newSelections['_search'] === undefined) {
        this.setSearchText('')
      }
      this.setFilterSelection(newSelections)
    }
  }
})
</script>
