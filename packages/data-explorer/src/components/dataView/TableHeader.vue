<template>
  <thead>
  <tr>
    <th scope="col" v-if="isShop"></th>
    <th scope="col"
        v-for="(label, index) in header" :key="index">
      {{ label }}
    </th>
  </tr>
  </thead>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    header: {
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
