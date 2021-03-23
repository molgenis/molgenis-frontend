<template>
  <button
    type="button"
    :class="{'btn-primary': isSelected, 'btn-outline-secondary': !isSelected}"
    class="btn-sm float-right text-nowrap shopping-button"
    @click="toggleSelectedItems(id)"
  >
    <font-awesome-icon v-if="isSelected" size="xs" icon="minus" />
    <font-awesome-icon v-else size="xs" icon="plus" />
    <font-awesome-icon icon="shopping-cart" />
  </button>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ShoppingButton',
  props: {
    id: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapMutations('explorer', [ 'toggleSelectedItems' ])
  }
}
</script>
