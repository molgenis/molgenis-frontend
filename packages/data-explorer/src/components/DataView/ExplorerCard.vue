<template>
  <div class="card">
    <shopping-button :id="id" :isSelected="isSelected"></shopping-button>
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
    }
  },
  components: { ShoppingButton }
})
</script>
