<template>
  <button type="button" class="btn btn-light">
    <slot />
  </button>
</template>

<script>
  import Vue from 'vue'
  import ActiveFilters from '../components/ActiveFilters'

  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faShoppingCart, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  library.add(faShoppingCart, faTh, faThList)

  export default Vue.extend({
    name: 'ToolbarView',
    components: { ActiveFilters, FontAwesomeIcon }
  })
</script>
