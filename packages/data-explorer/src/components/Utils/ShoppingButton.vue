<template>
  <button
    type="button"
    :class="{'btn-primary': isSelected, 'btn-outline-secondary': !isSelected}"
    class="m-2 btn-sm float-right text-nowrap">
    <font-awesome-icon size="xs" v-if="isSelected" icon="minus"/>
    <font-awesome-icon size="xs" v-else icon="plus"/>
    <font-awesome-icon icon="shopping-cart"/>
  </button>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faMinus, faPlus)

export default Vue.extend({
  name: 'ShoppingButton',
  props: {
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  components: { FontAwesomeIcon }
})
</script>
