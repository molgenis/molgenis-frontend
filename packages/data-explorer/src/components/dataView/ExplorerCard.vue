<template>
  <div class="card">
    <shopping-button :id="id" v-if="isShop" :isSelected="isSelected"></shopping-button>
    <slot>
      <custom-card-content v-if="customCode"></custom-card-content>
      <default-card-content v-else :dataLabel="dataLabel" :dataContents="dataContents"></default-card-content>
    </slot>
  </div>
</template>

<script>
import Vue from 'vue'
import ShoppingButton from '../utils/ShoppingButton'
import DefaultCardContent from './DefaultCardContent'
import CustomCardContent from './CustomCardContent'

export default Vue.extend({
  name: 'ExplorerCard',
  props: {
    id: {
      type: String,
      required: true
    },
    dataLabel: {
      type: String,
      required: true
    },
    dataContents: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: () => false
    },
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    },
    customCode: {
      type: String,
      required: false
    }
  },
  components: { ShoppingButton, DefaultCardContent, CustomCardContent }
})
</script>
