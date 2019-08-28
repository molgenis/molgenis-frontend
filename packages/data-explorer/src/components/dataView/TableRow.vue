<template>
  <tr>
    <td v-if="isShop"><shopping-button :isSelected="isSelected" :id="id"></shopping-button></td>
    <td v-for="(item, index) in rowData" :key="index">{{item}}</td>
  </tr>
</template>

<script>
import ShoppingButton from '../utils/ShoppingButton'
export default {
  name: 'EntityTableRow',
  props: {
    id: {
      type: String,
      required: true
    },
    rowData: {
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
    }
  },
  components: { ShoppingButton }
}
</script>
