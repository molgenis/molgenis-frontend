<template>
  <div class="card">
    <shopping-button v-if="isShop" :isSelected="isSelected" @click.native="clickShop(id)"></shopping-button>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import ShoppingButton from '../Utils/ShoppingButton'

export default Vue.extend({
  name: 'EntityCards',
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
    clickShop: {
      type: Function,
      required: false
    },
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  components: { ShoppingButton }
})
</script>
