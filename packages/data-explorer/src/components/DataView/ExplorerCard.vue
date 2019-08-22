<template>
  <div class="card">
    <shopping-button v-if="isShop" :id="id" :isSelected="isSelected"></shopping-button>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import ShoppingButton from '../Utils/ShoppingButton'

export default Vue.extend({
  name: 'ExplorerCard',
  props: {
    id: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: () => false
    },
    isShop: {
      type: Boolean,
      required: true
    }
  },
  components: { ShoppingButton }
})
</script>
