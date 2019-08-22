<template>
  <div class="toolbar mt-2">
    <button
      v-if="!showShoppingCart && dataDisplayLayout === 'TableView'"
      @click="setDataDisplayLayout('CardView')"
      class="btn btn-light ml-1 float-right btn-outline-secondary">
      <font-awesome-icon icon="th"></font-awesome-icon>
      Card layout
    </button>
    <button
      v-else-if="!showShoppingCart"
      @click="setDataDisplayLayout('TableView')"
      class="btn btn-light ml-1 float-right btn-outline-secondary table-layout">
      <font-awesome-icon icon="th-list"></font-awesome-icon>
      Table layout
    </button>
    <button
      v-if="!showShoppingCart && isShop"
      @click="setShowShoppingCart(true)"
      class="btn btn-light ml-1 float-right btn-outline-secondary">
      <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
      Show cart
    </button>

    <active-filters></active-filters>
  </div>
</template>

<script>
import Vue from 'vue'
import ActiveFilters from '../components/ToolbarView/ActiveFilters'
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStore, faShoppingCart, faTh, faThList, faSlidersH, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faTh, faThList, faSlidersH, faStore, faShoppingBag)

export default Vue.extend({
  name: 'ToolbarView',
  computed: {
    ...mapState(['dataDisplayLayout', 'showFilters', 'showShoppingCart', 'isShop'])
  },
  methods: {
    setDataDisplayLayout (value) {
      this.$store.commit('setDataDisplayLayout', value)
    },
    setShowShoppingCart (value) {
      this.$store.commit('setShowShoppingCart', value)
      this.$store.commit('setShowFilters', !value)
    }
  },
  components: { ActiveFilters, FontAwesomeIcon }
})
</script>
