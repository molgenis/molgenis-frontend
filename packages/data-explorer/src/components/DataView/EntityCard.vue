<template>
  <div
    class="card"
  >
    <shopping-button :showShop="showShop" @click.native="cardClick"></shopping-button>
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
    ...mapMutations(['toggleShoppingItems']),
    cardClick () {
      if (this.isShop) {
        this.toggleShoppingItems(this.id)
      }
    }
  },
  components: { ShoppingButton }
})
</script>
