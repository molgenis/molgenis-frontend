<template>
  <div class="toolbar">
    <info-icon-button
      v-if="showFilters"
      @click.native="setShowFilter(false)"
      name="Hide filter"
      class="float-right">
      <font-awesome-icon icon="sliders-h" />
    </info-icon-button>
    <info-icon-button
      v-else-if="!shoppingFilter"
      @click.native="setShowFilter(true)"
      name="Show Filters"
      class="float-right">
      <font-awesome-icon icon="sliders-h" />
    </info-icon-button>

    <info-icon-button
      v-if="dataDisplayLayout === 'table'"
      @click.native="setDataDisplayLayout('cards')"
      name="Card layout"
      class="float-right">
      <font-awesome-icon icon="th" />
    </info-icon-button>
    <info-icon-button
      v-else
      @click.native="setDataDisplayLayout('table')"
      name="Table layout"
      class="float-right">
      <font-awesome-icon icon="th-list" />
    </info-icon-button>

    <info-icon-button
      v-if="shoppingFilter && hasCart"
      @click.native="setShoppingFilter(false)"
      name="Show all"
      class="float-right">
      <font-awesome-icon icon="store" />
    </info-icon-button>
    <info-icon-button
      v-else-if="hasCart"
      @click.native="setShoppingFilter(true)"
      name="Show cart"
      class="float-right">
      <font-awesome-icon icon="shopping-cart" />
    </info-icon-button>
    <button v-if="shoppingFilter && hasCart" class="btn btn-success float-right m-1">
      <font-awesome-icon icon="shopping-bag" /> Order
    </button>

    <active-filters />
  </div>
</template>

<script>
import Vue from 'vue'
import ActiveFilters from '../components/ToolbarView/ActiveFilters'
import InfoIconButton from '../components/Utils/InfoIconButton'
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
    setShowFilter (value) {
      this.$store.commit('setShowFilters', value)
    },
    setDataDisplayLayout (value) {
      this.$store.commit('setDataDisplayLayout', value)
    },
    setShoppingFilter (value) {
      this.$store.commit('setShoppingFilter', value)
      this.$store.commit('setShowFilters', !value) // Hide filters in shopping cart
    }
  },
  components: { ActiveFilters, InfoIconButton, FontAwesomeIcon }
})
</script>

<style scoped>
  .toolbar {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
  }
</style>
