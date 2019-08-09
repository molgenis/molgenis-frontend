<template>
  <button
    type="button"
    :class="{'btn-primary': showShop, 'btn-outline-primary': !showShop}"
    class="m-1 btn-sm float-right text-nowrap">
    <font-awesome-icon size="xs" v-if="showShop" icon="minus"/>
    <font-awesome-icon size="xs" v-else icon="plus"/>
    <font-awesome-icon icon="shopping-cart"/>
  </button>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faMinus, faPlus)

export default Vue.extend({
  name: 'ShoppingButton',
  props: {
    showShop: {
      type: Boolean,
      required: true
    }
  },
  components: { FontAwesomeIcon }
})
</script>
