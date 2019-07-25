<template>
  <div class="toolbar">
    <info-icon-button
      v-if="getDataDisplayLayout() === 'table'"
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

    <info-icon-button name="Shopping cart" class="float-right">
      <font-awesome-icon icon="shopping-cart" />
    </info-icon-button>

    <active-filters />
  </div>
</template>

<script>
import Vue from 'vue'
import ActiveFilters from '../components/ToolbarView/ActiveFilters'
import InfoIconButton from '../components/Utils/InfoIconButton'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingCart, faTh, faThList)

export default Vue.extend({
  name: 'ToolbarView',
  methods: {
    setDataDisplayLayout (value) {
      this.$store.commit('setDataDisplayLayout', value)
    },
    getDataDisplayLayout () {
      return this.$store.state.dataDisplayLayout
    }
  },
  components: { ActiveFilters, InfoIconButton, FontAwesomeIcon }
})
</script>

<style scoped>
  .toolbar{
    margin-left: -0.25rem;
    margin-right: -0.25rem;
  }
</style>
