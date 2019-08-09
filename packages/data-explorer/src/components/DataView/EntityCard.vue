<template>
  <div class="card">
    <shopping-button v-if="isShop" :showShop="showShop" @click.native="clickShop(id)"></shopping-button>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
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
  computed: {
    showShop () {
      return this.isShop && this.isSelected
    }
  },
  methods: {
    ...mapMutations(['toggleShoppingItems'])
  },
  components: { ShoppingButton }
})
</script>
