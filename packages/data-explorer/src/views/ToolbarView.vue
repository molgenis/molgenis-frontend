<template>
  <div class="toolbar mt-2">
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
      v-model="filters.selections"
      :filters="filters.definition"
    ></active-filters>
  </div>
</template>

<script>
import Vue from 'vue'
import ActiveFilters from '../../node_modules/@molgenis/molgenis-ui-filter/src/components/ActiveFilters.vue'
import { mapState, mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStore, faShoppingCart, faTh, faThList, faSlidersH, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faTh, faThList, faSlidersH, faStore, faShoppingBag)

export default Vue.extend({
  name: 'ToolbarView',
  computed: {
    ...mapState(['dataDisplayLayout', 'hideFilters', 'showShoppingCart', 'tableSettings', 'filters'])
  },
  methods: {
    ...mapMutations(['setDataDisplayLayout', 'setShowShoppingCart', 'setHideFilters']),
    toggleDataDisplayLayout () {
      const value = this.dataDisplayLayout === 'TableView' ? 'CardView' : 'TableView'
      this.setDataDisplayLayout(value)
    },
    openShoppingCart () {
      this.setShowShoppingCart(true)
      this.setHideFilters(true)
    }
  },
  components: { ActiveFilters, FontAwesomeIcon }
})
</script>
