<template>
  <tr>
    <td v-if="isShop"><shopping-button :isSelected="isSelected" :id="id"></shopping-button></td>
    <td v-for="(column, index) in visibleColumns" :key="index">
      {{rowData[column.name]}}
    </td>
  </tr>
</template>

<script>
import ShoppingButton from '../utils/ShoppingButton'
export default {
  name: 'TableRow',
  props: {
    id: {
      type: String,
      required: true
    },
    rowData: {
      type: Object,
      required: true
    },
    visibleColumns: {
      type: Array,
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
