<template>
  <!-- Note: This is a placeholder object -->
  <div class="toolbar">
    <div @click="isList=!isList">
    <info-icon-button
      v-if="isList"

      name="card display"
      class="float-right">
      <font-awesome-icon icon="th" />
    </info-icon-button>
    <info-icon-button
      v-else
      @click="isList=!isList"
      name="List display"
      class="float-right">
      <font-awesome-icon icon="th-list" />
    </info-icon-button>
    </div>

    <info-icon-button name="Shopping cart" class="float-right">
      <font-awesome-icon icon="shopping-cart" />
    </info-icon-button>

    <active-filters />
  </div>
</template>

<script>
import Vue from 'vue'
import ActiveFilters from '../components/ActiveFilters'
import InfoIconButton from '../components/InfoIconButton'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingCart, faTh, faThList)

export default Vue.extend({
  name: 'ToolbarView',
  data () {
    return {
      isList: true
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
