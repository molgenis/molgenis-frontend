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
      v-if="selectedItemIds.length > 0 && !showSelected"
      :cartSelectionText="`${selectedItemIds.length} item${selectedItemIds.length==1?'':'s'} selected`"
      :clickHandler="openSelectionList"
      title="Selection"
      v-model="handleSelectionItems"
    >
      <template v-slot:removeButton><font-awesome-icon icon="times"></font-awesome-icon></template>
      <template v-slot:buttonText>
        <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
        Show cart
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faShoppingCart)

export default Vue.extend({
  name: 'DataView',
  components: { SelectLayoutView, ClipboardView, ActiveFilters, CartSelectionToast, FontAwesomeIcon },
  computed: {
    ...mapState([
      'showSelected',
      'tableName',
      'tableMeta',
      'tableSettings',
      'searchText',
      'filters',
      'selectedItemIds',
      'tableData',
      'tableMeta'
    ]),
    displayName () {
      return (this.tableMeta && this.tableMeta.labelAttribute && this.tableMeta.labelAttribute.name) || 'name'
    },
    handleSelectionItems: {
      get () {
        if (this.tableData.items && this.tableData.items.length > 0) {
          return this.selectedItemIds.map(id => ({ id: id, name: this.tableData.items.find(item => item.id === id)[this.displayName] }))
        }
        return []
      },
      set (value) {
        this.setSelectedItems(value.map(item => item.id))
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
      'setShowSelected',
      'setHideFilters',
      'setSelectedItems'
    ]),
    openSelectionList () {
      this.setShowSelected(true)
      this.setHideFilters(true)
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
