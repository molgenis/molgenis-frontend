<template>
  <div
    class="card"
  >
    <button
      @click="cardClick"
      type="button"
      :class="{'btn-primary': showShop, 'btn-outline-primary': !showShop}"
      class="m-1 btn-sm float-right">
      <font-awesome-icon size="xs" v-if="showShop" icon="minus"/>
      <font-awesome-icon size="xs" v-else icon="plus"/>
      <font-awesome-icon icon="shopping-cart"/>
    </button>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faMinus, faPlus)

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
  components: { FontAwesomeIcon }
})
</script>

<style scoped>
  .is-shop {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
  }

  .selected .is-shop {
    background-color: red;
  }
</style>
