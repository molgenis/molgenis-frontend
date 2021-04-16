<template>
  <shopping-button :id="id" :is-selected="isSelected" />
</template>

<script>
import { mapState } from 'vuex'
import ShoppingButton from '../utils/ShoppingButton.vue'
export default {
  components: {
    ShoppingButton
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('explorer', ['selectedItemIds']),
    isSelected () {
      return this.selectedItemIds.includes(this.id)
    },
  }

}
</script>
