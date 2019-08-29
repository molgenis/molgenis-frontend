<template>
  <div class="card mg-explorer-card">
    <shopping-button :id="id" v-if="isShop" :isSelected="isSelected"></shopping-button>
    <slot>
      <custom-card-content v-if="customCode"></custom-card-content>
      <default-card-content v-else
      :dataLabel="dataLabel"
      :dataContents="dataContents"
      :collapseLimit="collapseLimit"
      @expandDefaultCard="handleDefaultCardExpand"
      ></default-card-content>
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
    },
    collapseLimit: {
      type: Number,
      default: () => 5
    }
  },
  components: { ShoppingButton, DefaultCardContent, CustomCardContent },
  methods: {
    handleDefaultCardExpand () {
      this.$emit('expandCard', { id: this.id })
    }
  }
})
</script>

<style scoped>
  .mg-explorer-card {
    min-width: 24rem;
  }
</style>
