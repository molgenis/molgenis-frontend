<template>
  <div class="toolbar mt-2">
    <a
      v-if="!showShoppingCart"
      class="btn btn-light btn-outline-secondary card-layout"
      role="button"
      :href="'/plugin/data-row-edit/' + tableName">
      <font-awesome-icon icon="plus-square"></font-awesome-icon>
      Add
    </a>
    <button
      v-if="!showShoppingCart && dataDisplayLayout === 'TableView'"
      @click="toggleDataDisplayLayout"
      class="btn btn-light ml-1 float-right btn-outline-secondary card-layout">
      <font-awesome-icon icon="th"></font-awesome-icon>
      Card layout
    </button>
    <button
      v-else-if="!showShoppingCart"
      @click="toggleDataDisplayLayout"
      class="btn btn-light ml-1 float-right btn-outline-secondary table-layout">
      <font-awesome-icon icon="th-list"></font-awesome-icon>
      Table layout
    </button>
    <button
      v-if="!showShoppingCart && tableSettings.isShop"
      @click="openShoppingCart"
      class="btn btn-light ml-1 float-right btn-outline-secondary show-cart">
      <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
      Show cart
    </button>
    <active-filters
      @input="saveFilterState"
      :value="activeFilterSelections"
      :filters="filterDefinitions"
    ></active-filters>
  </div>
</template>

<script>
import Vue from 'vue'
import ActiveFilters from '../../node_modules/@molgenis/molgenis-ui-filter/src/components/ActiveFilters.vue'
import { mapState, mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStore, faShoppingCart, faTh, faThList, faSlidersH, faShoppingBag, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faTh, faThList, faSlidersH, faStore, faShoppingBag, faPlusSquare)

export default Vue.extend({
  name: 'ToolbarView',
  computed: {
    ...mapState(['dataDisplayLayout', 'hideFilters', 'showShoppingCart', 'tableSettings', 'filters', 'searchText', 'tableName']),
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
    ...mapMutations(['setDataDisplayLayout', 'setShowShoppingCart', 'setHideFilters', 'setFilterSelection', 'setSearchText']),
    toggleDataDisplayLayout () {
      const value = this.dataDisplayLayout === 'TableView' ? 'CardView' : 'TableView'
      this.setDataDisplayLayout(value)
    },
    openShoppingCart () {
      this.setShowShoppingCart(true)
      this.setHideFilters(true)
    },
    saveFilterState (newSelections) {
      if (newSelections['_search'] === undefined) {
        this.setSearchText('')
      }
      this.setFilterSelection(newSelections)
    }
  },
  components: { ActiveFilters, FontAwesomeIcon }
})
</script>
