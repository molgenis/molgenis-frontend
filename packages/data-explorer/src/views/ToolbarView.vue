<template>
  <div class="toolbar">
    <button
      v-if="dataDisplayLayout === 'table'"
      @click="setDataDisplayLayout('cards')"
      class="btn btn-light ml-1 float-right btn-outline-secondary">
      <font-awesome-icon icon="th"></font-awesome-icon>
      Card layout
    </button>
    <button
      v-else
      @click="setDataDisplayLayout('table')"
      class="btn btn-light ml-1 float-right btn-outline-secondary table-layout">
      <font-awesome-icon icon="th-list"></font-awesome-icon>
      Table layout
    </button>

    <button
      v-if="shoppingFilter && hasCart"
      @click="setShoppingFilter(false)"
      class="btn btn-light ml-1 float-right btn-outline-secondary">
      <font-awesome-icon icon="store"></font-awesome-icon>
      Show store
    </button>
    <button
      v-else-if="hasCart"
      @click="setShoppingFilter(true)"
      class="btn btn-light ml-1 float-right btn-outline-secondary">
      <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
      Show cart
    </button>
    <button v-if="shoppingFilter && hasCart" class="btn btn-success float-right ml-1">
      <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
    </button>

    <active-filters></active-filters>
  </div>
</template>

<script>
import Vue from 'vue'
import ActiveFilters from '../components/toolbarView/ActiveFilters'
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStore, faShoppingCart, faTh, faThList, faSlidersH, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingCart, faTh, faThList, faSlidersH, faStore, faShoppingBag)

export default Vue.extend({
  name: 'ToolbarView',
  computed: {
    ...mapState(['dataDisplayLayout', 'showFilters', 'shoppingFilter'])
  },
  props: {
    hasCart: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  methods: {
    setDataDisplayLayout (value) {
      this.$store.commit('setDataDisplayLayout', value)
    },
    setShoppingFilter (value) {
      this.$store.commit('setShoppingFilter', value)
      this.$store.commit('setShowFilters', !value) // Hide filters in shopping cart
    }
  },
  components: { ActiveFilters, FontAwesomeIcon }
})
</script>
