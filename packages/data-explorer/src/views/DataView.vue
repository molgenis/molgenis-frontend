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
    <cart-selection-toast
      v-if="shoppedEntityItems.length > 0"
      :cartSelectionText="`${shoppedEntityItems.length} item${shoppedEntityItems.length==1?'':'s'} selected`"
      :clickHandler="selectionAction"
      title="Selection"
      v-model="shoppedEntityItems"
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
      'showShoppingCart',
      'tableName',
      'tableMeta',
      'tableSettings',
      'searchText',
      'filters',
      'shoppedEntityItems'
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
    ...mapMutations([
      'setFilterSelection',
      'setSearchText'
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
