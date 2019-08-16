<template>
  <tr>
    <td v-if="isShop"><shopping-button :isSelected="isSelected" @click.native="clickShop(id)"></shopping-button></td>
    <td v-for="(item, index) in data" :key="index">{{item}}</td>
  </tr>
</template>

<script>
import ShoppingButton from '../Utils/ShoppingButton'
export default {
  name: 'EntityTableRow',
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: Object,
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
}
</script>
