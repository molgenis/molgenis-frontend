<template>
  <thead>
  <tr>
    <th scope="col" v-if="isShop"></th>
    <th scope="col" v-if="!isShop"></th>
    <th scope="col"
        v-for="(column, index) in visibleColumns" :key="index">
      {{ column.name }}
    </th>
  </tr>
  </thead>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    visibleColumns: {
      type: Array,
      required: true
    },
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }
}
</script>
